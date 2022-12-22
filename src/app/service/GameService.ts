import { MAX_ROUNDS, SALT_LENGTH } from '../constants'
import {
  EGameStatus,
  IBookRepository,
  IGameRepository,
  TModelId,
  TGameModel,
  TLanguageModel,
  TUserModel,
  IGameService,
  IGameServiceClass
} from '../type'
import { getSalt, sha512 } from '../utils'

export const GameService: IGameServiceClass = class GameService implements IGameService {
  #gameRepository: IGameRepository
  #bookRepository: IBookRepository

  constructor(gameRepository: IGameRepository, bookRepository: IBookRepository) {
    this.#gameRepository = gameRepository
    this.#bookRepository = bookRepository
  }

  static toDTO(game: TGameModel) {
    const { word, salt, result, languageId, guess, user, ...rest } = game.toJSON()
    const isCompleted = result !== EGameStatus.IN_PROGRESS

    return {
      ...rest,
      isCompleted,
      status: result,
      guess: guess.map(({ id, guess }) => ({
        id,
        result: GameService.guessToDTO(guess, word)
      })),
      hash: sha512(salt, word),
      ...(isCompleted
        ? {
            word,
            secret: salt
          }
        : undefined)
    }
  }

  private static guessToDTO(guess: string, word: string) {
    const count: Record<string, number> = {}
    const result = guess.split('').map((character, i) => {
      const isEqual = character === word[i]

      if (!isEqual) {
        count[word[i]] = (count[word[i]] || 0) + 1
      }

      return {
        character: character,
        position: isEqual,
        exists: isEqual
      }
    })

    for (let i = 0; i < result.length; i++) {
      const character = guess[i]

      if (!result[i].position && count[character]) {
        count[character] -= 1
        result[i].exists = true
      }
    }

    return result
  }

  async startNewGame(user: TUserModel, language: TLanguageModel) {
    const { word } = (await this.#bookRepository.getRandom(language)) || {}
    if (!word) {
      throw new Error(`${language.code} book is empty`)
    }

    const salt = getSalt(SALT_LENGTH)
    const game = await this.#gameRepository.create({ word, salt, languageId: language.id }, user)

    return game
  }

  async getGame(gameId: TModelId) {
    const game = await this.#gameRepository.findById(gameId)

    return game
  }

  async makeGuess(gameId: TModelId, guess: string) {
    const game = await this.getGame(gameId)

    if (!game) {
      throw new Error(`No game found with id: ${gameId}`)
    }

    if (game.guess.length >= MAX_ROUNDS || game.result !== EGameStatus.IN_PROGRESS) {
      throw new Error(`Game is already complete: ${gameId}`)
    }

    const trx = await this.#gameRepository.startTransaction()

    try {
      const updatedGame = await this.#gameRepository.createGuess(game, guess, trx)
      const { word, guess: guessList } = updatedGame
      const { guess: lastGuess } = guessList[guessList.length - 1]
      const isSuccess = word === lastGuess
      const isCompleted = guessList.length >= MAX_ROUNDS || isSuccess

      if (isCompleted) {
        this.#gameRepository.completeGame(
          updatedGame,
          isSuccess ? EGameStatus.SUCCESS : EGameStatus.FAIL,
          trx
        )
      }

      const result = await this.#gameRepository.touch(updatedGame, trx)
      trx.commit()
      return result
    } catch (e) {
      trx.rollback()

      throw e
    }
  }

  prepareGame(game: TGameModel) {
    return GameService.toDTO(game)
  }
}

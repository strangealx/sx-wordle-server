import { PartialModelGraph, Transaction } from 'objection'
import { Game } from '../model'
import {
  IGameRepository,
  TCreateGame,
  EGameStatus,
  TUserModel,
  TLanguageModel
} from '../type'
import { BaseRepository } from './BaseRepository'

export class GameRepository
  extends BaseRepository<Game>
  implements IGameRepository
{
  constructor() {
    super(Game)
  }

  async create(game: TCreateGame, user: TUserModel, trx?: Transaction) {
    return await this.Model.query(trx)
      .insertGraphAndFetch(
        {
          ...game,
          result: EGameStatus.IN_PROGRESS,
          user: { id: user.id }
        } as PartialModelGraph<Game>,
        { relate: true }
      )
      .withGraphFetched('guess')
  }

  async findById(gameId: number) {
    return this.Model.query()
      .whereNotDeleted()
      .withGraphFetched('guess')
      .findById(gameId)
  }

  async findLastUnfinishedGameByUser(
    user: TUserModel,
    language: TLanguageModel
  ) {
    return user
      .$relatedQuery<Game>('game')
      .whereNotDeleted()
      .withGraphFetched('guess')
      .findOne({ result: EGameStatus.IN_PROGRESS, languageId: language.id })
      .orderBy('createdAt', 'DESC')
  }

  async createGuess(game: Game, guess: string, trx?: Transaction) {
    const nextGuess = await game
      .$relatedQuery('guess', trx)
      .insertAndFetch({ guess })
    game.guess.push(nextGuess)

    return game
  }

  async completeGame(game: Game, result: EGameStatus, trx?: Transaction) {
    return game.$query(trx).withGraphFetched('guess').patchAndFetch({ result })
  }

  async touch(game: Game, trx?: Transaction) {
    return game.$query(trx).withGraphFetched('guess').patchAndFetch({})
  }
}

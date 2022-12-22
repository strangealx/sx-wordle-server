import { Transaction } from 'objection'
import { Game } from '../../model'
import { IRepository } from './IRepository'
import { TLanguageModel, TUserModel } from '.'

export type TCreateGame = {
  languageId: number
  word: string
  salt: string
}

export enum EGameStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}

export interface IGameRepository extends IRepository<Game> {
  findById(gameId: number): Promise<Game | undefined>
  create(game: TCreateGame, user: TUserModel, trx?: Transaction): Promise<Game>
  findLastUnfinishedGameByUser(
    user: TUserModel,
    language: TLanguageModel
  ): Promise<Game | undefined>
  createGuess(game: Game, guess: string, trx?: Transaction): Promise<Game>
  completeGame(
    game: Game,
    result: EGameStatus,
    trx?: Transaction
  ): Promise<Game>
  touch(game: Game, trx?: Transaction): Promise<Game>
}

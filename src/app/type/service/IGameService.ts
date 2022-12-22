import { TApiGame } from '../api'
import {
  IBookRepository,
  IGameRepository,
  TGameModel,
  TLanguageModel,
  TModelId,
  TUserModel
} from '../repository'

export interface IGameService {
  startNewGame(user: TUserModel, language: TLanguageModel): Promise<TGameModel>
  getGame(gameId: TModelId): Promise<TGameModel | undefined>
  makeGuess(gameId: TModelId, guess: string): Promise<TGameModel>
  prepareGame(game: TGameModel): TApiGame
}

export interface IGameServiceClass {
  new (
    gameRepository: IGameRepository,
    bookRepository: IBookRepository
  ): IGameService
  toDTO(game: TGameModel): TApiGame
}

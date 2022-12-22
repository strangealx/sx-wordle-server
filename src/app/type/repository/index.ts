import { TCreateGame, EGameStatus, IGameRepository } from './IGameRepository'
import { IGuessRepository } from './IGuessRepository'
import { IBookRepository } from './IBookRepository'
import { IUserRepository } from './IUserRepository'
import { ILanguageRepository } from './ILanguageRepository'
import { IRepository } from './IRepository'

type Model<T extends IRepository> = InstanceType<T['Model']>

export type TModelId = number
export type TGameModel = Model<IGameRepository>
export type TGuessModel = Model<IGuessRepository>
export type TBookModel = Model<IBookRepository>
export type TUserModel = Model<IUserRepository>
export type TLanguageModel = Model<ILanguageRepository>

export {
  TCreateGame,
  EGameStatus,
  IGameRepository,
  IGuessRepository,
  IBookRepository,
  IUserRepository,
  ILanguageRepository
}

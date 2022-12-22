import { TLanguageModel, TUserModel } from '../repository'

export type TState = {
  headers: { fingerprint: string; language: string }
  user: TUserModel
  language: TLanguageModel
}

import { EGameStatus, TModelId } from '../repository'

export * from './state'

export type TApiGuessResult = {
  character: string
  position: boolean
  exists: boolean
}

export type TApiGuess = {
  id: TModelId
  result: TApiGuessResult[]
}

export type TApiGuessRequest = {
  guess: string
}

export type TApiGame = {
  id: TModelId
  isCompleted: boolean
  status: EGameStatus
  guess: TApiGuess[]
  word?: string | undefined
  secret?: string | undefined
}

export type TApiLanguage = {
  id: TModelId
  code: string
}

export type TApiGameParams = {
  id: TModelId
}

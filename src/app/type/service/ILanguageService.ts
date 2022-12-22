import { TApiLanguage } from '../api'
import { ILanguageRepository, TLanguageModel } from '../repository'

export interface ILanguageService {
  getLanguage(code: string): Promise<TLanguageModel | undefined>
  getAllLanguages(): Promise<TLanguageModel[]>
  prepareLanguage(game: TLanguageModel): TApiLanguage
}

export interface ILanguageServiceClass {
  new (languageRepository: ILanguageRepository): ILanguageService
  toDTO(game: TLanguageModel): TApiLanguage
}

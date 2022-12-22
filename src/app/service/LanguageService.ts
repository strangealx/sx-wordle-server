import {
  ILanguageRepository,
  ILanguageService,
  ILanguageServiceClass,
  TLanguageModel
} from '../type'

export const LanguageService: ILanguageServiceClass = class LanguageService
  implements ILanguageService
{
  #languageRepository: ILanguageRepository

  constructor(languageRepository: ILanguageRepository) {
    this.#languageRepository = languageRepository
  }

  static toDTO(language: TLanguageModel) {
    return language.toJSON()
  }

  async getLanguage(code: string) {
    const language = await this.#languageRepository.findByCode(code)

    return language
  }

  async getAllLanguages() {
    const languages = await this.#languageRepository.all()

    return languages
  }

  prepareLanguage(language: TLanguageModel) {
    return LanguageService.toDTO(language)
  }
}

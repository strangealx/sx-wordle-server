import { Language } from '../model'
import { ILanguageRepository } from '../type'
import { BaseRepository } from './BaseRepository'

export class LanguageRepository
  extends BaseRepository<Language>
  implements ILanguageRepository
{
  constructor() {
    super(Language)
  }

  async all() {
    return this.Model.query().whereNotDeleted()
  }

  async findById(id: number) {
    return this.Model.query().whereNotDeleted().findById(id)
  }

  async findByCode(code: string) {
    return this.Model.query().whereNotDeleted().findOne({ code })
  }
}

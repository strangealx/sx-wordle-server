import { Language } from '../../model'
import { IRepository } from './IRepository'

export interface ILanguageRepository extends IRepository<Language> {
  all(): Promise<Language[]>
  findById(id: number): Promise<Language | undefined>
  findByCode(code: string): Promise<Language | undefined>
}

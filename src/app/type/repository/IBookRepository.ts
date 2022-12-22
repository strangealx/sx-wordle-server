import { Book } from '../../model'
import { IRepository } from './IRepository'
import { TLanguageModel } from '.'

export interface IBookRepository extends IRepository<Book> {
  getRandom(language: TLanguageModel): Promise<Book | undefined>
}

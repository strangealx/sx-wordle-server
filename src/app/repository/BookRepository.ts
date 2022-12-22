import { Book, Language } from '../model'
import { IBookRepository } from '../type'
import { BaseRepository } from './BaseRepository'

export class BookRepository extends BaseRepository<Book> implements IBookRepository {
  constructor() {
    super(Book)
  }

  async getRandom(language: Language) {
    return language.$relatedQuery<Book>('book').whereNotDeleted().orderByRaw('RAND()').first()
  }
}

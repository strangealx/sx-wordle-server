import { Model } from 'objection'
import { BaseModel } from './BaseModel'
import { Language } from './Language'
import { withAutoUpdate, withSoftDelete } from './mixins'

export class Book extends withSoftDelete(withAutoUpdate(BaseModel)) {
  languageId!: number
  word!: string

  static tableName = 'book'

  static relationMappings = () => ({
    language: {
      relation: Model.BelongsToOneRelation,
      modelClass: Language,
      join: {
        from: 'book.languageId',
        to: 'language.id'
      }
    }
  })
}

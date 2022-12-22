import { Model } from 'objection'
import { BaseModel } from './BaseModel'
import { Book } from './Book'
import { Game } from './Game'
import { withAutoUpdate, withSoftDelete } from './mixins'

export class Language extends withSoftDelete(withAutoUpdate(BaseModel)) {
  code!: string

  static tableName = 'language'

  static relationMappings = () => ({
    book: {
      relation: Model.HasOneRelation,
      modelClass: Book,
      join: {
        from: 'language.id',
        to: 'book.languageId'
      }
    },
    game: {
      relation: Model.HasManyRelation,
      modelClass: Game,
      join: {
        from: 'language.id',
        to: 'game.languageId'
      }
    }
  })
}

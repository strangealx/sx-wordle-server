import { Model } from 'objection'
import { BaseModel } from './BaseModel'
import { Guess } from './Guess'
import { Language } from './Language'
import { User } from './User'
import { withAutoUpdate, withSoftDelete } from './mixins'
import { EGameStatus } from '../type'

export class Game extends withSoftDelete(withAutoUpdate(BaseModel)) {
  languageId!: number
  word!: string
  salt!: string
  result!: EGameStatus
  guess!: Guess[]
  user!: User

  static tableName = 'game'

  static relationMappings = () => ({
    language: {
      relation: Model.BelongsToOneRelation,
      modelClass: Language,
      join: {
        from: 'game.languageId',
        to: 'language.id'
      }
    },
    guess: {
      relation: Model.HasManyRelation,
      modelClass: Guess,
      join: {
        from: 'game.id',
        to: 'guess.gameId'
      }
    },
    user: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'game.id',
        through: {
          from: 'userToGame.gameId',
          to: 'userToGame.userId'
        },
        to: 'user.id'
      }
    }
  })
}

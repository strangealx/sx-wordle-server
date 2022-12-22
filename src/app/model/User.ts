import { Model } from 'objection'
import { BaseModel } from './BaseModel'
import { Game } from './Game'
import { withAutoUpdate, withSoftDelete } from './mixins'

export class User extends withSoftDelete(withAutoUpdate(BaseModel)) {
  fingerprint!: string

  static tableName = 'user'

  static relationMappings = () => ({
    game: {
      relation: Model.ManyToManyRelation,
      modelClass: Game,
      join: {
        from: 'user.id',
        through: {
          from: 'userToGame.userId',
          to: 'userToGame.gameId'
        },
        to: 'game.id'
      }
    }
  })
}

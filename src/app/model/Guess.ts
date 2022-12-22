import { Model, QueryContext } from 'objection'
import { BaseModel } from './BaseModel'
import { Game } from './Game'
import { withAutoUpdate, withSoftDelete } from './mixins'

export class Guess extends withSoftDelete(withAutoUpdate(BaseModel)) {
  gameId!: number
  guess!: string

  static tableName = 'guess'

  static relationMappings = () => ({
    game: {
      relation: Model.BelongsToOneRelation,
      modelClass: Game,
      join: {
        from: 'guess.gameId',
        to: 'game.id'
      }
    }
  })

  $beforeInsert(queryContext: QueryContext): void {
    super.$beforeInsert(queryContext)

    this.guess = this.guess.toLowerCase()
  }
}

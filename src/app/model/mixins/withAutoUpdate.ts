import { Model, ModelOptions, Pojo, QueryContext } from 'objection'
import { Mixin, MixinConstructor } from '../../type'

export const withAutoUpdate = <T extends MixinConstructor<Model>>(
  ModelClass: T
) =>
  class WithAutoUpdate extends ModelClass {
    createdAt!: Date
    updatedAt!: Date

    $beforeUpdate(opt: ModelOptions, queryContext: QueryContext): void {
      super.$beforeUpdate(opt, queryContext)

      this.updatedAt = new Date()
    }

    $beforeInsert(queryContext: QueryContext): void {
      super.$beforeInsert(queryContext)

      this.createdAt = new Date()
      this.updatedAt = new Date()
    }

    $formatJson(json: Pojo): Pojo {
      const modified = super.$formatJson(json)
      const { createdAt, updatedAt, ...rest } = modified

      return rest
    }
  }

export type withAutoUpdate = Mixin<typeof withAutoUpdate>

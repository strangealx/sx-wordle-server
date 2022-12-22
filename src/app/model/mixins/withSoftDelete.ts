import {
  Model,
  Modifiers,
  Page,
  PartialModelObject,
  NumberQueryBuilder,
  QueryBuilder,
  Pojo
} from 'objection'
import { Mixin, MixinConstructor } from '../../type'

export const withSoftDelete = <T extends MixinConstructor<Model>>(Base: T) => {
  // TODO: this QueryBuilder should exend Model.QueryBuilder.
  // But there are some ts problems, I can't figure out right now
  class SoftDeleteQueryBuilder<M extends WithSoftDelete, R = M[]> extends QueryBuilder<M, R> {
    ArrayQueryBuilderType!: SoftDeleteQueryBuilder<M, M[]>
    SingleQueryBuilderType!: SoftDeleteQueryBuilder<M, M>
    NumberQueryBuilderType!: SoftDeleteQueryBuilder<M, number>
    PageQueryBuilderType!: SoftDeleteQueryBuilder<M, Page<M>>

    delete(): NumberQueryBuilder<this> {
      this.context({
        softDelete: true
      })

      return this.patch({
        deletedAt: new Date()
      } as unknown as PartialModelObject<M>)
    }

    hardDelete() {
      return super.delete()
    }

    undelete() {
      this.context({
        undelete: true
      })

      return this.patch({ deletedAt: null } as unknown as PartialModelObject<M>)
    }

    whereDeleted() {
      return this.whereNotNull(`${this.modelClass().tableName}.deletedAt`)
    }

    whereNotDeleted() {
      return this.whereNull(`${this.modelClass().tableName}.deletedAt`)
    }
  }

  class WithSoftDelete extends Base {
    static isSoftDelete = true
    static QueryBuilder = SoftDeleteQueryBuilder
    QueryBuilderType!: SoftDeleteQueryBuilder<this, this[]>
    deletedAt!: Date

    static modifiers: Modifiers = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      ...(super.modifiers || undefined),
      notDeleted: (b) => {
        // prettier-ignore
        (b as SoftDeleteQueryBuilder<WithSoftDelete>).whereNotDeleted()
      },
      deleted: (b) => {
        // prettier-ignore
        (b as SoftDeleteQueryBuilder<WithSoftDelete>).whereDeleted()
      }
    }

    $formatJson(json: Pojo): Pojo {
      const modified = super.$formatJson(json)
      const { deletedAt, ...rest } = modified

      return rest
    }
  }

  return WithSoftDelete
}

export type withSoftDelete = Mixin<typeof withSoftDelete>

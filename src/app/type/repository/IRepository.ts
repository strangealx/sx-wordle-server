import { Model, ModelClass, Transaction } from 'objection'

export interface IRepository<T extends Model = Model> {
  Model: ModelClass<T>
  startTransaction(): Promise<Transaction>
}

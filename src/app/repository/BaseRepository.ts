import { Model, ModelClass } from 'objection'
import { IRepository } from '../type/repository/IRepository'

export class BaseRepository<T extends Model> implements IRepository<T> {
  #Model: ModelClass<T>

  constructor(Model: ModelClass<T>) {
    this.#Model = Model
  }

  get Model() {
    return this.#Model
  }

  async startTransaction() {
    return this.Model.startTransaction()
  }
}

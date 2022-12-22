import { Transaction } from 'objection'
import { User } from '../model'
import { IUserRepository, TModelId } from '../type'
import { BaseRepository } from './BaseRepository'

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(User)
  }

  async create(fingerprint: string, trx?: Transaction) {
    return this.Model.query(trx).insertAndFetch({ fingerprint })
  }

  async findById(userId: TModelId) {
    return this.Model.query().whereNotDeleted().findById(userId)
  }

  async findByFingerprint(fingerprint: string) {
    return this.Model.query().whereNotDeleted().findOne({ fingerprint })
  }

  async hasAccess(user: User, gameId: TModelId) {
    const game = await user.$relatedQuery('game').findById(gameId)

    return !!game
  }

  async touch(user: User, trx?: Transaction) {
    return user.$query(trx).patchAndFetch({})
  }
}

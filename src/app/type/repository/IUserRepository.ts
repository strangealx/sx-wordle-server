import { Transaction } from 'objection'
import { TModelId } from '.'
import { User } from '../../model'
import { IRepository } from './IRepository'

export interface IUserRepository extends IRepository<User> {
  create(fingerprint: string, trx?: Transaction): Promise<User>
  findById(id: number): Promise<User | undefined>
  findByFingerprint(fingerprint: string): Promise<User | undefined>
  hasAccess(user: User, gameId: TModelId): Promise<boolean>
  touch(user: User, trx?: Transaction): Promise<User | undefined>
}

import { IUserRepository, TModelId, TUserModel } from '../type'
import { IUserService, IUserServiceClass } from '../type/service/IUserService'
import { sha512 } from '../utils'
import { FINGERPRINT_SALT } from '../constants'

export const UserService: IUserServiceClass = class UserService
  implements IUserService
{
  #userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.#userRepository = userRepository
  }

  async create(fingerprint: string) {
    const user = await this.#userRepository.create(sha512(FINGERPRINT_SALT, fingerprint))

    return user
  }

  async getUser(fingerprint: string) {
    const user = await this.#userRepository.findByFingerprint(sha512(FINGERPRINT_SALT, fingerprint))

    return user
  }

  async hasAccess(user: TUserModel, gameId: TModelId) {
    return this.#userRepository.hasAccess(user, gameId)
  }
}

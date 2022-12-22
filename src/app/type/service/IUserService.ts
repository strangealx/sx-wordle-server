import { IUserRepository, TModelId, TUserModel } from '../repository'

export interface IUserService {
  create(fingerprint: string): Promise<TUserModel>
  getUser(fingerprint: string): Promise<TUserModel | undefined>
  hasAccess(user: TUserModel, gameId: TModelId): Promise<boolean>
}

export interface IUserServiceClass {
  new (userRepository: IUserRepository): IUserService
}

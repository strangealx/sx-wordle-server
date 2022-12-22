import { Middleware } from '@koa/router'
import { IUserService, TApiGameParams, TState } from '../../type'

type TAccessControl = (service: { userService: IUserService }) => Middleware<TState>

export const accessControl: TAccessControl =
  ({ userService }) =>
  async (ctx, next) => {
    const { user } = ctx.state
    const params = ctx.params as unknown as TApiGameParams
    const { id: gameId } = params

    const hasAccess = await userService.hasAccess(user, gameId)

    if (!hasAccess) {
      ctx.throw(403)
      return
    }

    await next()
  }

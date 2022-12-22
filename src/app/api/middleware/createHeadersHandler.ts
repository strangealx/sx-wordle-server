import { Middleware } from '@koa/router'
import { ILanguageService, IUserService } from '../../type'
import { TState } from '../../type'

type TCreateHeadersHandler = (service: {
  userService: IUserService
  languageService: ILanguageService
}) => Middleware<TState>

export const createHeadersHandler: TCreateHeadersHandler =
  ({ userService, languageService }) =>
  async (ctx, next) => {
    const {
      headers: { fingerprint, language: languageCode }
    } = ctx.state
    let user = await userService.getUser(fingerprint)
    const language = await languageService.getLanguage(languageCode)

    if (!language) {
      ctx.throw(400, `Language: "${languageCode}" does not exist`)
      return
    }

    if (!user) {
      user = await userService.create(fingerprint)
    }

    ctx.state.user = user
    ctx.state.language = language
    await next()
  }

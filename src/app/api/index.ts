import Router from '@koa/router'
import { Middleware } from 'koa'
import { router as game } from './game'
import { router as language } from './language'
import { router as settings } from './settings'

export const api: () => Middleware = () => async (ctx, next) => {
  const router = new Router()

  router.use(game.routes())
  router.use(language.routes())
  router.use(settings.routes())

  ctx.app.use(router.routes()).use(router.allowedMethods())

  await next()
}

import * as Joi from 'joi'
import { HttpError, Middleware } from 'koa'

type TErrorHandler = () => Middleware

export const errorHandler: TErrorHandler = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof Joi.ValidationError) {
      ctx.satus = 422
      ctx.body = err
      return
    }

    if (err instanceof HttpError) {
      ctx.status = err?.status || 500
      ctx.body = {
        message: err.message,
        details: err.details
      }
      return
    }

    ctx.status = 500
    ctx.body = {
      message: 'Internal Server Error'
    }

    console.log(err)
  }
}

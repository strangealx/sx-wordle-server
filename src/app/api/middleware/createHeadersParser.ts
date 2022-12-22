import { Middleware } from '@koa/router'
import * as Joi from 'joi'

type TCreateHeadersParser = (
  headers: Record<string, { schema: Joi.Schema; header: string }>
) => Middleware

export const createHeadersParser: TCreateHeadersParser =
  (headers) => async (ctx, next) => {
    const schema: Record<string, Joi.Schema> = {}
    const headerMap = Object.keys(headers).reduce((carry, key) => {
      schema[key] = headers[key].schema

      return {
        ...carry,
        [key]: ctx.get(headers[key].header) || undefined
      }
    }, {})

    const { error, value } = Joi.object()
      .keys(schema)
      .validate(headerMap, { abortEarly: false })

    if (error) {
      ctx.throw(400, {
        message: 'Invalid headers',
        details: error.details.map(({ message }) => message)
      })
      return
    }

    ctx.state.headers = value

    await next()
  }

import { Middleware } from '@koa/router'
import * as Joi from 'joi'

type TCreateValidator = (schema: {
  params?: Joi.Schema
  body?: Joi.Schema
}) => Middleware

export const createValidator: TCreateValidator =
  ({ params: paramsSchema, body: bodySchema }) =>
  async (ctx, next) => {
    const summarySchema = Joi.object().keys({
      ...(paramsSchema ? { params: paramsSchema } : undefined),
      ...(bodySchema ? { body: bodySchema } : undefined)
    })
    const {
      params,
      request: { body }
    } = ctx

    const { error } = summarySchema.validate(
      { params, body },
      { abortEarly: false, stripUnknown: true }
    )

    if (error) {
      ctx.throw(400, {
        message: 'Invalid body',
        details: error.details.map(({ message }) => message)
      })
      return
    }

    await next()
  }

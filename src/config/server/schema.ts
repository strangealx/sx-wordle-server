import * as Joi from 'joi'

export const schema = Joi.object()
  .keys({
    port: Joi.number().optional()
  })
  .required()

import * as Joi from 'joi'

export const schema = Joi.object()
  .keys({
    fingerprintSalt: Joi.string().required()
  })
  .required()

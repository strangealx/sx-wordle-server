import * as Joi from 'joi'

export const schema = Joi.object().keys({
  client: Joi.string().valid('mysql2').required(),
  useNullAsDefault: Joi.boolean().default(true),
  connection: Joi.object().keys({
      host: Joi.string().optional(),
      port: Joi.number().optional(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      database: Joi.string().required(),
  }),
}).required()

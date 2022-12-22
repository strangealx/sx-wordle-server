import * as Joi from 'joi'
import { DEFAULT_LANGUAGE, WORD_LENGTH } from '../../constants'

export const guess = Joi.string().length(WORD_LENGTH).required().label('guess')
export const id = Joi.number().required().label('id')

export const fingerprint = Joi.string()
  .length(20)
  .required()
  .label('X-Fingerprint')

export const language = Joi.string()
  .default(DEFAULT_LANGUAGE)
  .length(2)
  .label('Accept-Language')

export const params = Joi.object().keys({ id })
export const body = Joi.object().keys({ guess })

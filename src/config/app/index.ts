import { config as dotenvConfig } from 'dotenv'
import { schema } from './schema'
import { TAppConfig } from './type'

const { parsed: config = {} } = dotenvConfig()

const app: TAppConfig = {
  fingerprintSalt: config.APP_FINGERPRINT_SALT || ''
}

const { error } = schema.validate(app)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export { app, TAppConfig }

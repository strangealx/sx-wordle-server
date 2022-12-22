import { config as dotenvConfig } from 'dotenv'
import { schema } from './schema'
import { TServerConfig } from './type'

const { parsed: config = {} } = dotenvConfig()

const server: TServerConfig = {
  port: Number(config.APP_PORT) || 80
}

const { error } = schema.validate(server)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export { server, TServerConfig }

import { config as dotenvConfig } from 'dotenv'
import { schema } from './schema';
import { TDatabaseConfig } from './type'

const { parsed: config = {} } = dotenvConfig()

const db: TDatabaseConfig = {
  client: config.DB_CLIENT,
  useNullAsDefault: true,
  connection: {
    database: config.DB_NAME,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    port: Number(config.DB_PORT) || 3306,
    host: config.DB_HOST || 'localhost'
  }
}

const { error } = schema.validate(db)

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export {
  db,
  TDatabaseConfig
}

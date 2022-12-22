import type { Knex } from 'knex'
import { db } from './src/config'

const knex: { [key: string]: Knex.Config } = {
  development: {
    ...db,
    migrations: {
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    }
  }
}

export default knex

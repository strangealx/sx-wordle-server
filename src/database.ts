import { Model, knexSnakeCaseMappers } from 'objection'
import Knex from 'knex'
import { TDatabaseConfig } from './config'

export const setupDatabase = (config: TDatabaseConfig) => {
  const knex = Knex({
    ...config,
    ...knexSnakeCaseMappers()
  })

  Model.knex(knex)
}

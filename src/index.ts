import { setupDatabase } from './database'
import { listen } from './server'
import { db as dbConfig, server as serverConfig } from './config'

// prettier-ignore
(() => {
  setupDatabase(dbConfig)
  listen(serverConfig)
})()

import { setupDatabase } from './database'
import { listen } from './server'
import { db as dbConfig, server as serverConfig } from './config'
;(() => {
  setupDatabase(dbConfig)
  listen(serverConfig)
})()

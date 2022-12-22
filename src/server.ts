import { createServer } from 'http'
import Koa from 'koa'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { api } from './app/api'
import { errorHandler } from './app/middleware'
import { TServerConfig } from './config/server'

export const listen = ({ port }: TServerConfig) => {
  const app = new Koa()

  app.on('error', console.log)

  // prettier-ignore
  app
    .use(errorHandler())
    .use(helmet())
    .use(cors())
    .use(bodyParser())
    .use(api())

  const server = createServer(app.callback())
  server.listen(port)
}

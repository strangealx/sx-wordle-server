import Router from '@koa/router'
import {
  BookRepository,
  GameRepository,
  LanguageRepository,
  UserRepository
} from '../../repository'
import { GameService, LanguageService, UserService } from '../../service'
import {
  fingerprint as fingerprintSchema,
  language as languageSchema,
  body as bodySchema,
  params as paramsSchema
} from './schema'
import {
  accessControl,
  createHeadersHandler,
  createHeadersParser,
  createValidator
} from '../middleware'
import { getGame } from './getGame'
import { createGame } from './createGame'
import { makeGuess } from './makeGuess'

const router = new Router({
  prefix: '/game'
})

// Services
const gameService = new GameService(new GameRepository(), new BookRepository())
const userService = new UserService(new UserRepository())
const languageService = new LanguageService(new LanguageRepository())

// Middlewares
const parseHeaders = createHeadersParser({
  fingerprint: {
    header: 'x-fingerprint',
    schema: fingerprintSchema
  },
  language: {
    header: 'accept-language',
    schema: languageSchema
  }
})
const handleHeaders = createHeadersHandler({ userService, languageService })
const handleAccess = accessControl({ userService })
const baseMiddleware = [parseHeaders, handleHeaders]

// Routes
router.post('/', ...baseMiddleware, createGame({ gameService }))
router.get(
  '/:id',
  ...baseMiddleware,
  createValidator({ params: paramsSchema }),
  handleAccess,
  getGame({ gameService })
)
router.post(
  '/:id/guess',
  ...baseMiddleware,
  createValidator({ body: bodySchema, params: paramsSchema }),
  handleAccess,
  makeGuess({ gameService })
)

export { router }

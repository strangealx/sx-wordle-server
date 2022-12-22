import Router from '@koa/router'
import { DEFAULT_LANGUAGE, MAX_ROUNDS, WORD_LENGTH } from '../../constants'

const router = new Router({
  prefix: '/settings'
})

// Routes
router.post('/', async (ctx) => {
  ctx.body = {
    wordLength: WORD_LENGTH,
    maxRounds: MAX_ROUNDS,
    defaultLanguage: DEFAULT_LANGUAGE
  }
})

export { router }

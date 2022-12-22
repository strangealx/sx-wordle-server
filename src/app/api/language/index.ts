import Router from '@koa/router'
import { LanguageRepository } from '../../repository'
import { LanguageService } from '../../service'
import { getList } from './getList'

const router = new Router({
  prefix: '/language'
})

// Services
const languageService = new LanguageService(new LanguageRepository())

// Routes
router.post('/list', getList({ languageService }))

export { router }

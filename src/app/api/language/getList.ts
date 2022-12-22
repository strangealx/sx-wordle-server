import { Context } from 'koa'
import { ILanguageService } from '../../type'

type TGetList = (service: { languageService: ILanguageService }) => (ctx: Context) => void

export const getList: TGetList =
  ({ languageService }) =>
  async (ctx) => {
    const list = await languageService.getAllLanguages()

    ctx.body = list.map(languageService.prepareLanguage)
  }

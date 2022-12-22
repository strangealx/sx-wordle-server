import { Context } from 'koa'
import { IGameService } from '../../type'

type TCreateGame = (service: { gameService: IGameService }) => (ctx: Context) => void

export const createGame: TCreateGame =
  ({ gameService }) =>
  async (ctx) => {
    const {
      state: { user, language }
    } = ctx

    const game = await gameService.startNewGame(user, language)

    if (!game) {
      ctx.throw(500)
      return
    }

    ctx.body = gameService.prepareGame(game)
  }

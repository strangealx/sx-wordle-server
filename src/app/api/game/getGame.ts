import { Context } from 'koa'
import { IGameService } from '../../type'

type TGetGame = (service: {
  gameService: IGameService
}) => (ctx: Context) => void

export const getGame: TGetGame =
  ({ gameService }) =>
  async (ctx) => {
    const {
      params: { id: gameId }
    } = ctx

    const game = await gameService.getGame(gameId)

    if (!game) {
      ctx.throw(404, 'Game not found')
      return
    }

    ctx.body = gameService.prepareGame(game)
  }

import { Context } from 'koa'
import { IGameService, TApiGameParams, TApiGuessRequest } from '../../type'

type TCreateGame = (service: {
  gameService: IGameService
}) => (ctx: Context) => void

export const makeGuess: TCreateGame =
  ({ gameService }) =>
  async (ctx) => {
    const body = ctx.request.body as TApiGuessRequest
    const params = ctx.params as TApiGameParams
    const { guess } = body
    const { id: gameId } = params

    const game = await gameService.makeGuess(gameId, guess)

    if (!game) {
      ctx.throw(500)
      return
    }

    ctx.body = gameService.prepareGame(game)
  }

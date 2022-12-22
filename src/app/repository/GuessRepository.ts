import { Transaction } from 'objection'
import { Guess } from '../model'
import { IGameRepository, IGuessRepository } from '../type'
import { BaseRepository } from './BaseRepository'

export class GuessRepository
  extends BaseRepository<Guess>
  implements IGuessRepository
{
  constructor() {
    super(Guess)
  }

  async create(
    game: InstanceType<IGameRepository['Model']>,
    guess: string,
    trx?: Transaction
  ) {
    return game.$relatedQuery<Guess>('guess', trx).insertAndFetch({ guess })
  }
}

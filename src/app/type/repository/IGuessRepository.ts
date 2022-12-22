import { Transaction } from 'objection'
import { TGameModel } from '.'
import { Guess } from '../../model'
import { IRepository } from './IRepository'

export interface IGuessRepository extends IRepository<Guess> {
  create(game: TGameModel, guess: string, trx?: Transaction): Promise<Guess>
}

import { randomBytes } from 'crypto'
import { RANDOM_SALT_HEX_LENGTH } from '../constants'
import { getRandomInt } from './getRandomInt'

type TGetSalt = (saltLength: number, entropy?: number) => string

export const getSalt: TGetSalt = (saltLength, entropy = RANDOM_SALT_HEX_LENGTH) => {
  if (entropy < saltLength) {
    throw new Error('Entropy length must be greater then salt')
  }

  const start = getRandomInt(0, entropy - saltLength)
  const salt = randomBytes(entropy)
    .toString('hex')
    .substring(start, start + saltLength)

  return salt
}

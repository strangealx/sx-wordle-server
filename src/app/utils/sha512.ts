import { createHash } from 'crypto'

export const sha512 = (...str: string[]) =>
  createHash('sha512').update(str.filter(Boolean).join('-'), 'utf-8').digest('hex')

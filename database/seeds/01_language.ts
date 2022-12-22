import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('language').del()

  // Inserts seed entries
  await knex('language').insert([{ code: 'en' }, { code: 'ru' }])
}

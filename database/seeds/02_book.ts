import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('book').del()

  // Gets some data from previous seed
  const languages = await knex('language').select('id', 'code')
  const languageMap = languages.reduce(
    (carry, { code, id }) => ({
      ...carry,
      [code]: id
    }),
    {}
  )

  // Inserts seed entries
  await knex('book').insert([
    { word: 'magic', language_id: languageMap.en },
    { word: 'fight', language_id: languageMap.en },
    { word: 'замок', language_id: languageMap.ru },
    { word: 'курок', language_id: languageMap.ru }
  ])
}

export type TDatabaseConfig = {
  client: string
  useNullAsDefault: boolean
  connection: {
    database: string
    user: string
    password: string
    port: number
    host: string
  }
}

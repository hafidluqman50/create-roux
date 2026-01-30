import { Sequelize } from 'sequelize'

const databaseUrl = process.env.DATABASE_URL

const database = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: process.env.DB_LOGGING === 'true' ? console.log : false
    })
  : new Sequelize(
      process.env.DB_NAME ?? '',
      process.env.DB_USER ?? '',
      process.env.DB_PASSWORD ?? '',
      {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        dialect: 'postgres',
        logging: process.env.DB_LOGGING === 'true' ? console.log : false
      }
    )

database
  .authenticate()
  .then(() => {
    console.log('======================== DATABASE CONNECTED! ========================')
  })
  .catch(() => {
    console.log('======================== DATABASE DISCONNECTED! ========================')
  })

export default database

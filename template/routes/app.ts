import express, { Express, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import '@config/database'
import healthRoutes from '@routes/health'
import exampleRoutes from '@routes/examples'

const app: Express = express()
const port: string | number = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req: Request, res: Response): void => {
  res.status(200).json({
    message: 'Roux API is running'
  })
})

// AUTO-GENERATED ROUTES IMPORTS
// END AUTO-GENERATED ROUTES IMPORTS

app.use('/api/health', healthRoutes)
app.use('/api/examples', exampleRoutes)

// AUTO-GENERATED ROUTES
// END AUTO-GENERATED ROUTES

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

export default app

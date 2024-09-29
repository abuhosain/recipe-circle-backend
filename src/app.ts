import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cockieParser from 'cookie-parser'
import path from 'path'
import notFound from './app/middleware/notFound'
import globalErrorHandler from './app/middleware/globalErrorHandlers'
import router from './app/routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cockieParser())

// cors configaration
app.use(cors())


// application routes
app.use("/api", router);


// Test route
app.get('/', async (req: Request, res: Response) => {
  const message = 'Recipe Circle server is running'
  res.send(message)
})

// Catch-all route for client-side routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})


// global error handler
app.use(globalErrorHandler);

// not found route
// app.use(notFound);


export default app;
import express from 'express'
import dotenv from 'dotenv'
import { notFoundUrl, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import rateLimiter from './utils/rateLimiter.js'
import helmet from 'helmet'
import userRoutes from './routes/userRoutes.js'
import messageRouters from './routes/messageRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(helmet())
app.use(rateLimiter)
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRouters)

app.get('/', (req, res) => {
  res.send('API is running...')
})

//errors handler
app.use(notFoundUrl)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT
  // console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

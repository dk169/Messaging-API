import mongoose from 'mongoose'
import config from './config.js'

const env = process.env.NODE_ENV || 'development'

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') return
    mongoose.connect(config.db[env], config.dbParams)
    const conn = await mongoose.connect(config.db[env], config.dbParams)

    // console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    // console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB

import mongoose from 'mongoose'
import CustomError from '../utils/customError.js'

const notFoundUrl = (req, res, next) => {
  next(new CustomError(`Requested URL ${req.path} not found!`, 404))
}
// Global error handler
const errorHandler = (err, req, res, next) => {
  const resObj = {
    success: 0,
    message: err.message,
  }

  // if environment is development console the error and and stack to the response object
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
    resObj.stack = err.stack
  }

  // if it's monogodb cast error then show Custom message
  if (err instanceof mongoose.Error.CastError) {
    resObj.message = 'Data was not found'
  }

  // if it's monogodb duplicate key error then show Custom message
  if (err.name === 'MongoError' && err.code === 11000) {
    resObj.message = 'Email already exists'
    err.code = 500
  }

  // if environment isn't development and Opereational set to false then show generic error message
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    resObj.message = 'Something went wrong'
  }

  res.status(err.code || 500).json(resObj)
}

export { notFoundUrl, errorHandler }

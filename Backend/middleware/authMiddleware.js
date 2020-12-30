import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import CustomError from '../utils/customError.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // saving the login user data into the req object
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      // console.log(error)
      if (error instanceof jwt.TokenExpiredError) {
        throw new CustomError('Not authorized, token expired please login', 401)
      }

      throw new CustomError('Not authorized, token failed', 401)
    }
  }

  if (!token) {
    throw new CustomError('Not Authorized, no token', 401)
  }
})

export { protect }

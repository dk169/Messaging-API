import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import CustomResponse from '../utils/CustomResponse.js'
import CustomError from '../utils/customError.js'

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return next(new CustomError(`User not found`, 404))
  }

  if (user && (await user.matchPassword(password))) {

    res.json(new CustomResponse({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    }))
  } else {
    return next(new CustomError('Invalid name or password', 401))
  }
})

// @desc     Register a new user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, email } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return next(new CustomError('User already exists', 400))
  }

  const user = await User.create({
    name,
    password,
    email,
  })

  if (!user) {
    return next(new CustomError('Invalid user data', 400))
  }

  res.json(new CustomResponse({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  }))
})

// @desc     Update user profile
// @route    PUT /api/users/:id
// @access   Private
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new CustomError('User not found', 404))
  }

  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  if (req.body.password) {
    user.password = req.body.password
  }

  const updatedUser = await user.save()

  res.json(new CustomResponse({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  }))
})

//@desc     Get all users
//@route    GET /api/users
//@access   Private
const getUsers = asyncHandler(async (req, res, next) => {
  // const users = await User.find().select('-password')
  const users = await User.find()
  res.json(new CustomResponse(users))
})

//@desc     Delete user
//@route    DELETE /api/users/:id
//@access   Private
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {    
    return next(new CustomError('User not found', 404))
  }

  await user.remove()
  res.json({ success:1, message: 'User removed' })
})

//@desc     Get user by ID
//@route    GET /api/users/:id
//@access   Private
const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password')
  if (!user) {

    return next(new CustomError('User not found', 404))
  }
  res.json(new CustomResponse(user))
})



export { authUser, registerUser, getUsers, getUserById, updateUser, deleteUser }

import asyncHandler from 'express-async-handler'
import Message from '../models/messageModel.js'
import CustomResponse from '../utils/CustomResponse.js'
import CustomError from '../utils/customError.js'

// @desc     Create a Message
// @route    POST  /api/messages
// @access   Private
const createMessage = asyncHandler(async (req, res, next) => {
  const { receiver, message, subject } = req.body

  const newMessage = new Message({
    sender: req.user._id,
    receiver,
    message,
    subject,
  })

  const createdMessage = await newMessage.save()

  res.status(201).json(new CustomResponse(createdMessage))
})

// @desc     Fetch all Messages for login user
// @route    GET /api/messages
// @access   Private
const getAllUserMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    $or: [{ sender: req.user._id }, { receiver: req.user._id }],
  })
    .populate({ path: 'sender', select: 'name' })
    .populate({ path: 'receiver', select: 'name' })
    .exec()

  res.json(new CustomResponse(messages))
})

// @desc     Fetch all unread Messages for login user
// @route    GET /api/messages/unread
// @access   Private
const getAllUnreadMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    receiver: req.user._id,
    isRead: false,
  })
    .populate({ path: 'sender', select: 'name' })
    .populate({ path: 'receiver', select: 'name' })
    .exec()
  res.json(new CustomResponse(messages))
})

// @desc     Update a message that has been read
// @route    PUT /api/messages/:id/read
// @access   Private
const readMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id)

  if (!message) {
    return next(new CustomError(`Message not found!`, 404))
  }
  message.isRead = true
  const updatedMessage = await message.save()

  res.json(new CustomResponse(updatedMessage))
})

// @desc     Delete a message
// @route    DELETE /api/messages/:id
// @access   Private
const deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id)
  if (!message) {
    return next(new CustomError(`Message not found!`, 404))
  }
  await message.remove()
  res.json({ success: 1, message: 'Message removed' })
})

export {
  createMessage,
  getAllUserMessages,
  getAllUnreadMessages,
  readMessage,
  deleteMessage,
}

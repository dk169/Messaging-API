import express from 'express'
const router = express.Router()
import {
  createMessage,
  getAllUserMessages,
  getAllUnreadMessages,
  readMessage,
  deleteMessage,
} from '../controllers/messageController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllUserMessages).post(protect, createMessage)

router.route('/unread').get(protect, getAllUnreadMessages)

router.route('/:id/read').put(protect, readMessage)
router.route('/:id').delete(protect, deleteMessage)

export default router

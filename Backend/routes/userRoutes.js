import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

// router.route('/').get(protect, getUsers)
router.route('/').get( getUsers)
router.route('/register').post(registerUser)
router.post('/login', authUser)
router
  .route('/:id')
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUser)

export default router

import mongoose from 'mongoose'

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    __v: { type: Number, select: false}
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Messages', messageSchema)

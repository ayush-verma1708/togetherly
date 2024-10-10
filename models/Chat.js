// models/Chat.js
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: { type: String },
    mediaType: {
      type: String,
      enum: ['text', 'image', 'video', 'audio'],
      default: 'text',
    }, // Supported media types
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;

// models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['questionnaire', 'quiz', 'check-in', 'virtual-date'],
      required: true,
    },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    scheduledAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;

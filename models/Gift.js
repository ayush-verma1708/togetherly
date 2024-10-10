// models/Gift.js
import mongoose from 'mongoose';

const giftSchema = new mongoose.Schema(
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
    giftType: { type: String, enum: ['physical', 'digital'], required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'pending'],
      default: 'pending',
    },
    deliveryDate: { type: Date },
  },
  { timestamps: true }
);

const Gift = mongoose.model('Gift', giftSchema);
export default Gift;

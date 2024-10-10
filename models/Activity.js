// models/Activity.js
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityType: {
      type: String,
      enum: ['playlist', 'book', 'movie', 'game'],
      required: true,
    },
    status: {
      type: String,
      enum: ['planned', 'completed'],
      default: 'planned',
    },
    description: { type: String },
    scheduledDate: { type: Date },
  },
  { timestamps: true }
);

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;

// models/Location.js
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    speed: { type: Number, default: null }, // Only available for premium users
  },
  { timestamps: true }
);

// Ensure 2dsphere index for geo queries
locationSchema.index({ location: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);
export default Location;

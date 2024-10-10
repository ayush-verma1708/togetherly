// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    premium: { type: Boolean, default: false },
    mood: {
      type: String,
      enum: ['Happy', 'Sad', 'Neutral', 'Excited', 'Anxious'],
      default: 'Neutral',
    }, // Daily Mood Check-In
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to partner
  },
  { timestamps: true }
);

// Hashing password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

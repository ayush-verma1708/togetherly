// models/Quiz.js
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [
      {
        question: { type: String, required: true },
        answer: { type: String },
      },
    ],
    completed: { type: Boolean, default: false },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;

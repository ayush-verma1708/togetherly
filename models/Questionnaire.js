// models/Questionnaire.js
import mongoose from 'mongoose';

const questionnaireSchema = new mongoose.Schema(
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
    completed: { type: Boolean, default: false }, // Track completion status
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);
export default Questionnaire;

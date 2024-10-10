import Quiz from '../models/Quiz.js';

// Create or Update Quiz
export const createOrUpdateQuiz = async (req, res) => {
  const { questions, partnerId, dueDate } = req.body;

  try {
    let quiz = await Quiz.findOne({ user: req.user._id, partner: partnerId });

    if (quiz) {
      quiz.questions = questions;
      quiz.dueDate = dueDate;
      await quiz.save();
    } else {
      quiz = await Quiz.create({
        user: req.user._id,
        partner: partnerId,
        questions,
        dueDate,
      });
    }

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Quiz
export const getQuiz = async (req, res) => {
  const { partnerId } = req.params;

  try {
    const quiz = await Quiz.findOne({ user: req.user._id, partner: partnerId });

    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

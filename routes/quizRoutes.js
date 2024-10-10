// routes/quizRoutes.js
import express from 'express';
import { createOrUpdateQuiz, getQuiz } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create or Update Quiz
router.post('/', protect, createOrUpdateQuiz);

// Get Quiz
router.get('/:partnerId', protect, getQuiz);

export default router;

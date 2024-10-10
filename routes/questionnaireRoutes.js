// routes/questionnaireRoutes.js
import express from 'express';
import {
  createOrUpdateQuestionnaire,
  getQuestionnaire,
} from '../controllers/questionnaireController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create or Update Questionnaire
router.post('/', protect, createOrUpdateQuestionnaire);

// Get Questionnaire
router.get('/:partnerId', protect, getQuestionnaire);

export default router;

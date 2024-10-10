// routes/chatRoutes.js
import express from 'express';
import {
  sendMessage,
  getMessages,
  getChatHistory,
} from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Send Message
router.post('/send', protect, sendMessage);

// Get Messages
router.get('/:userId/:partnerId', protect, getMessages);

// Get Chat History
router.get('/history/:partnerId', protect, getChatHistory);

export default router;

// routes/giftRoutes.js
import express from 'express';
import {
  sendGift,
  updateGiftStatus,
  getGifts,
} from '../controllers/giftController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Send Gift
router.post('/send', protect, sendGift);

// Update Gift Status
router.put('/:giftId', protect, updateGiftStatus);

// Get Gifts Sent or Received
router.get('/', protect, getGifts);

export default router;

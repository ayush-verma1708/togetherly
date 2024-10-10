// routes/userRoutes.js
import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get User Profile
router.get('/profile', protect, getUserProfile);

// Update User Profile
router.put('/profile', protect, updateUserProfile);

export default router;

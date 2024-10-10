// routes/authRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  linkPartner,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'; // middleware to protect routes

const router = express.Router();

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Get User Profile
router.get('/profile', protect, getUserProfile);

// Update User Profile
router.put('/profile', protect, updateUserProfile);

// Link Partner
router.post('/link-partner', protect, linkPartner);

export default router;

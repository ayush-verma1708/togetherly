// routes/notificationRoutes.js
import express from 'express';
import {
  createNotification,
  getUnreadNotifications,
  markAsRead,
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create Notification
router.post('/', protect, createNotification);

// Get Unread Notifications
router.get('/unread', protect, getUnreadNotifications);

// Mark Notification as Read
router.put('/:notificationId', protect, markAsRead);

export default router;

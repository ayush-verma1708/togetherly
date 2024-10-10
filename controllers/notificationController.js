import Notification from '../models/Notification.js';

// Create Notification
export const createNotification = async (req, res) => {
  const { type, message, scheduledAt } = req.body;

  try {
    const notification = await Notification.create({
      user: req.user._id,
      type,
      message,
      scheduledAt,
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Unread Notifications
export const getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
      read: false,
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark Notification as Read
export const markAsRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);

    if (notification) {
      notification.read = true;
      await notification.save();
      res.json({ message: 'Notification marked as read' });
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

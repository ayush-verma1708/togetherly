// controllers/chatController.js
import Chat from '../models/Chat.js';
import User from '../models/User.js';

// Send message
export const sendMessage = async (req, res) => {
  const { senderId, receiverId, message, mediaType } = req.body;

  try {
    const chat = new Chat({
      sender: senderId,
      receiver: receiverId,
      message,
      mediaType,
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get messages between two users
export const getMessages = async (req, res) => {
  const { userId, partnerId } = req.params;

  try {
    const chats = await Chat.find({
      $or: [
        { sender: userId, receiver: partnerId },
        { sender: partnerId, receiver: userId },
      ],
    });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Chat History between two users
export const getChatHistory = async (req, res) => {
  const { partnerId } = req.params;

  try {
    const chatHistory = await Chat.find({
      $or: [
        { sender: req.user._id, receiver: partnerId },
        { sender: partnerId, receiver: req.user._id },
      ],
    }).sort({ createdAt: 'asc' });

    res.json(chatHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

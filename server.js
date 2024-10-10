// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js'; // Make sure to add the .js extension

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = 3001; // Use a different port for testing
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Set your frontend's origin in production
  },
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import giftRoutes from './routes/giftRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import questionnaireRoutes from './routes/questionnaireRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/questionnaires', questionnaireRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/users', userRoutes);

// WebSocket events
io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);

  // Join a chat room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Send message
  socket.on('send_message', (data) => {
    io.to(data.roomId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

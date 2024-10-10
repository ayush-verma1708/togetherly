// routes/locationRoutes.js
import express from 'express';
import {
  updateLocation,
  getPartnerLocation,
} from '../controllers/locationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Update or Create Location
router.post('/', protect, updateLocation);

// Get Partner's Location
router.get('/:partnerId', protect, getPartnerLocation);

export default router;

import Gift from '../models/Gift.js';

// Send a Gift
export const sendGift = async (req, res) => {
  const { receiverId, giftType, description } = req.body;

  try {
    const gift = await Gift.create({
      sender: req.user._id,
      receiver: receiverId,
      giftType,
      description,
    });

    res.status(201).json(gift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Gift Status
export const updateGiftStatus = async (req, res) => {
  const { giftId } = req.params;
  const { status, deliveryDate } = req.body;

  try {
    const gift = await Gift.findById(giftId);

    if (gift) {
      gift.status = status;
      gift.deliveryDate = deliveryDate;
      await gift.save();
      res.json(gift);
    } else {
      res.status(404).json({ message: 'Gift not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Gifts Sent or Received
export const getGifts = async (req, res) => {
  try {
    const gifts = await Gift.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    });

    res.json(gifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

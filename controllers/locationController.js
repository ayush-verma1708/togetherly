import Location from '../models/Location.js';

// Update or Create Location
export const updateLocation = async (req, res) => {
  const { coordinates, speed } = req.body;

  try {
    let location = await Location.findOne({ user: req.user._id });

    if (location) {
      location.location.coordinates = coordinates;
      location.speed = req.user.premium ? speed : null;
      await location.save();
    } else {
      location = await Location.create({
        user: req.user._id,
        location: { type: 'Point', coordinates },
        speed: req.user.premium ? speed : null,
      });
    }

    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Partner's Location
export const getPartnerLocation = async (req, res) => {
  const { partnerId } = req.params;

  try {
    const location = await Location.findOne({ user: partnerId });

    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

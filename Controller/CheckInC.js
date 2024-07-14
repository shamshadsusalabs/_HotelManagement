const CheckIn = require('../Schema/CheckIn');

// Create a new check-in
exports.createCheckIn = async (req, res) => {
  try {
    const checkInData = req.body;
    const newCheckIn = await CheckIn.create(checkInData);
    res.status(201).json(newCheckIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save check-in data' });
  }
};

// Get all check-ins
exports.getAllCheckIns = async (req, res) => {
  try {
    const checkIns = await CheckIn.find();
    res.json(checkIns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch check-in data' });
  }
};

// Get a single check-in by ID
exports.getCheckInById = async (req, res) => {
  const { id } = req.params;
  try {
    const checkIn = await CheckIn.findById(id);
    if (!checkIn) {
      return res.status(404).json({ error: 'Check-in not found' });
    }
    res.json(checkIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch check-in data' });
  }
};

// Update a check-in by ID
exports.updateCheckIn = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedCheckIn = await CheckIn.findByIdAndUpdate(id, newData, { new: true });
    if (!updatedCheckIn) {
      return res.status(404).json({ error: 'Check-in not found' });
    }
    res.json(updatedCheckIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update check-in data' });
  }
};

// Delete a check-in by ID
exports.deleteCheckIn = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCheckIn = await CheckIn.findByIdAndDelete(id);
    if (!deletedCheckIn) {
      return res.status(404).json({ error: 'Check-in not found' });
    }
    res.json({ message: 'Check-in deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete check-in data' });
  }
};

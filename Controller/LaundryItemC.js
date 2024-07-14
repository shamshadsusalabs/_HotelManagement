const LaundryItem = require('../Schema/LaundryItem'); // Adjust the path as per your project structure


// Controller function to create a new laundry item
exports.createItem = async (req, res) => {
  try {
    const { type, weight, price, description } = req.body;
    const newItem = new LaundryItem({ type, weight, price, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller function to get all laundry items
exports.getItems = async (req, res) => {
  try {
    const items = await LaundryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller function to get a specific laundry item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await LaundryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller function to update a laundry item by ID
exports.updateItem = async (req, res) => {
  try {
    const { type, weight, price, description } = req.body;
    const updatedItem = await LaundryItem.findByIdAndUpdate(
      req.params.id,
      { type, weight, price, description },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller function to delete a laundry item by ID
exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await LaundryItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
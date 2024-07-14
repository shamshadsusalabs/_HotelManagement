const MenuItem = require('../Schema/RestaurantMenu'); // Adjust the path as per your project structure

exports.createMenuItem = async (req, res) => {
  try {
      const { itemName, description, price, image } = req.body;
      const menuItem = new MenuItem({ itemName, description, price, image });
      const savedMenuItem = await menuItem.save();
      res.status(201).json(savedMenuItem);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
      const menuItems = await MenuItem.find();
      res.status(200).json(menuItems);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Get a single menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
      const menuItem = await MenuItem.findById(req.params.id);
      if (!menuItem) {
          return res.status(404).json({ message: 'Menu item not found' });
      }
      res.status(200).json(menuItem);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Update a menu item by ID
exports.updateMenuItem = async (req, res) => {
  try {
      const { itemName, description, price, image } = req.body;
      const menuItem = await MenuItem.findById(req.params.id);
      if (!menuItem) {
          return res.status(404).json({ message: 'Menu item not found' });
      }
      menuItem.itemName = itemName;
      menuItem.description = description;
      menuItem.price = price;
      menuItem.image = image;
      const updatedMenuItem = await menuItem.save();
      res.status(200).json(updatedMenuItem);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Delete a menu item by ID
exports.deleteMenuItem = async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
          return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};
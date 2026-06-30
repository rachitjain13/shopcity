const Shop = require('../models/Shop');

// Create Shop
const createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Shop created successfully',
      shop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Shops
const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();

    res.status(200).json({
      success: true,
      count: shops.length,
      shops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createShop,
  getAllShops,
};
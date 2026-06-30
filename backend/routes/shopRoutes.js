const express = require('express');

const {
  createShop,
  getAllShops,
} = require('../controllers/shopController');

const router = express.Router();

router.post('/', createShop);

router.get('/', getAllShops);

module.exports = router;
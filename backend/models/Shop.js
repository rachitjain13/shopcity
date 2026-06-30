const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  ownerName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: '',
  },

  rating: {
    type: Number,
    default: 0,
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('Shop', shopSchema);
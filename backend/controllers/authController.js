const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    res.status(201).json({
  success: true,
  message: 'Account created successfully',
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone
  }
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Password'
      });
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      'shopcitysecret',
      {
        expiresIn: '7d'
      }
    );

    res.status(200).json({
      success: true,
      message: 'Login Successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const shopRoutes = require('./routes/shopRoutes');

require('dotenv').config();

const app = express();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/shops', shopRoutes);

app.get('/', (req, res) => {
  res.send('ShopCity Backend Running 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
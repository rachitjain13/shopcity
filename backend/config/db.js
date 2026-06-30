const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      family: 4,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Mongo Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
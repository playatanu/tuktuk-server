const mongoose = require('mongoose');

const connectdb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || 'mongodb://localhost:27017/ws'
    );
    console.log('db connected');
  } catch (error) {
    throw error;
  }
};

module.exports = connectdb;

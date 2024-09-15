import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongodb = async () => {
  try {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');

  }} catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

export default mongodb;
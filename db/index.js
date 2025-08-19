import mongoose from 'mongoose';

const connectDB = async CONNECTION_URL => {
  try {
    await mongoose.connect(CONNECTION_URL, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;

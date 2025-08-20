import dotenv from 'dotenv';
dotenv.config();
import app from './server/index.js';
import connectDB from './db/index.js';

const PORT = 5000;

const DB_URL_CONNECTION = process.env.MONGO_URI || '';

connectDB(DB_URL_CONNECTION).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

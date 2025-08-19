import dotenv from 'dotenv';
dotenv.config();
import app from './server/index.js';
import connectDB from './db/index.js';

const PORT = 5000;

const DB_URL_CONNECTION = 'mongodb+srv://revorise-devs:fa9GoJ9aYOoqpKLj@revorise-newspaper.rlkhnr3.mongodb.net/latamnews?retryWrites=true&w=majority&appName=Revorise-NewsPaper';

connectDB(DB_URL_CONNECTION).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

import mongoose from 'mongoose';

const successStoriesSchema = mongoose.Schema({
  title: String,
  summary: String,
  image: {
    url: String,
    image_description: String,
  },
  created_at: Date,
  target_country: String,
  tags: [String],
  topics: ['historias-de-exito'],
  author: String,
  article_date: Date,
  path: String,
});

const SuccessStories = mongoose.model('SuccessStories', successStoriesSchema, 'success-stories');

export default SuccessStories;

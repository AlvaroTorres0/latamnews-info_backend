import mongoose from 'mongoose';

const newsPreviewSchema = mongoose.Schema({
  title: String,
  summary: String,
  image: {
    url: String,
    image_description: String,
  },
  created_at: Date,
  target_country: String,
  tags: [String],
  topics: [String],
  author: String,
  article_date: Date,
  path: String,
});

const NewsPreview = mongoose.model('NewsPreview', newsPreviewSchema, 'news-preview');

export default NewsPreview;

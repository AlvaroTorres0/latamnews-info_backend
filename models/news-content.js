import mongoose from 'mongoose';

const newsContentSchema = mongoose.Schema({
  body: [Object],
});

const NewsContent = mongoose.model('NewsContent', newsContentSchema, 'news-content');

export default NewsContent;

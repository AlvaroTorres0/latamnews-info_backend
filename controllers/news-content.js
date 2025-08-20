import NewsContent from '../models/news-content.js';
import { findNewsPreviewById } from './news-preview.js';
import { toObjectId } from '../utils/main.js';

export const getFullNewContent = async (req, res) => {
  try {
    if (!req.params.id) throw new Error('No id provided');
    const { id } = req.params;

    const newContent = await NewsContent.findOne({
      id_new_preview: toObjectId(id),
    }).lean();

    if (!newContent) throw new Error('New content not found');

    const id_new_preview = newContent.id_new_preview;

    const newPreview = await findNewsPreviewById(id_new_preview);

    if (!newPreview) throw new Error('New preview not found');

    res.status(200).json({
      _id: newContent._id,
      id_new_preview: newContent.id_new_preview,
      header: {
        title: newContent.header.title,
        summary: newContent.header.summary,
        tags: newPreview.tags,
        topics: newPreview.topics,
        author: newPreview.author,
        post_date: newPreview.created_at,
        target_country: newPreview.target_country,
      },
      body: newContent.body,
    });
  } catch (error) {
    console.error('Error trying to get full news content:', error);
    res.status(500).json({
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

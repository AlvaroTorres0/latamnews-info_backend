import express from 'express';
import NewsPreview from '../models/news-preview.js';

const router = express.Router();

export const getLimitedNewsPreview = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 2, 50);
    const skip = Math.max(parseInt(req.query.skip) || 0, 0);

    if (isNaN(limit) || isNaN(skip)) {
      return res.status(400).json({
        message: 'The parameters limit and skip must be valid numbers',
      });
    }

    const newsPreview = await NewsPreview.find().sort({ created_at: -1 }).limit(limit).skip(skip).lean();

    const totalCount = await NewsPreview.countDocuments();

    const hasMore = skip + limit < totalCount;

    res.status(200).json({
      data: newsPreview,
      pagination: {
        limit,
        skip,
        total: totalCount,
        currentPage: Math.floor(skip / limit) + 1,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error trying to get limited news preview:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export default router;

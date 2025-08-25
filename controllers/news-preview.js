import NewsPreview from '../models/news-preview.js';

export const getLimitedNewsPreview = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 2, 50);
    const skip = Math.max(parseInt(req.query.skip) || 0, 0);

    if (isNaN(limit) || isNaN(skip)) {
      return res.status(400).json({
        message: 'The parameters limit and skip must be valid numbers',
      });
    }

    const newsPreview = await NewsPreview.find().limit(limit).skip(skip).lean();

    const totalCount = await NewsPreview.countDocuments();

    res.status(200).json({
      data: newsPreview.reverse(),
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

export const getNewPreviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const newPreview = await NewsPreview.findById(id).lean();

    if (!newPreview) {
      return res.status(404).json({
        message: 'New preview not found',
      });
    }

    res.status(200).json(newPreview);
  } catch (error) {
    console.error('Error trying to get new preview by id:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const findNewsPreviewById = async id => {
  try {
    return await NewsPreview.findById(id).lean();
  } catch (error) {
    console.error('Error finding news preview:', error);
    return null;
  }
};

export const publishNewPreview = async (req, res) => {
  if (!req.body.data) {
    return res.status(400).json({
      message: 'No data provided',
    });
  }
  try {
    const { title, summary, image, created_at, target_country, tags, topics, author } = req.body.data;

    const newPreview = new NewsPreview({
      title,
      summary,
      image,
      created_at,
      target_country,
      tags,
      topics,
      author,
    });

    await newPreview.save();

    res.status(200).json(newPreview._id);
  } catch (error) {
    console.error('Error trying to publish new news preview:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

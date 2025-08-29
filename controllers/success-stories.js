import SuccessStories from '../models/success-stories.js';

export const getLimitedSuccessStories = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 2, 50);
    const skip = Math.max(parseInt(req.query.skip) || 0, 0);

    if (isNaN(limit) || isNaN(skip)) {
      return res.status(400).json({
        message: 'The parameters limit and skip must be valid numbers',
      });
    }

    const lastSuccessStories = await SuccessStories.find().sort({ created_at: -1 }).limit(limit).skip(skip).lean();
    const totalCount = await SuccessStories.countDocuments();

    res.status(200).json({
      data: lastSuccessStories,
      pagination: {
        limit,
        skip,
        total: totalCount,
        currentPage: Math.floor(skip / limit) + 1,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error trying to get limited success stories:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const publishNewSuccessStory = async (req, res) => {
  if (!req.body.data) {
    return res.status(400).json({
      message: 'No data provided',
    });
  }
  try {
    const { title, summary, image, target_country, tags, author, article_date, path } = req.body.data;

    const newSuccessStory = new SuccessStories({
      title,
      summary,
      image,
      created_at: new Date(),
      target_country,
      tags,
      topics: ['historias-de-exito'],
      author,
      article_date: article_date,
      path,
    });

    await newSuccessStory.save();

    res.status(200).json(newSuccessStory._id);
  } catch (error) {
    console.error('Error trying to publish new success story:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

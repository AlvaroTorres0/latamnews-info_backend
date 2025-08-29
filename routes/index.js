import express from 'express';

const router = express.Router();
import newsPreviewRoutes from './news-preview-routes.js';
import newsContentRoutes from './news-content-routes.js';
import successStoriesRoutes from './success-stories-routes.js';

router.use('/news-preview', newsPreviewRoutes);
router.use('/news-content', newsContentRoutes);
router.use('/success-stories', successStoriesRoutes);

export default router;

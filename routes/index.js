import express from 'express';

const router = express.Router();
import newsPreviewRoutes from './news-preview-routes.js';
import newsContentRoutes from './news-content-routes.js';

router.use('/news-preview', newsPreviewRoutes);
router.use('/news-content', newsContentRoutes);

export default router;

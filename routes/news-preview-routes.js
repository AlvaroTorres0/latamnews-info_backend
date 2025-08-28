import express from 'express';

import { getLimitedNewsPreview, getNewPreviewById, publishNewPreview, getNewsPreviewByTopic } from '../controllers/news-preview.js';

const router = express.Router();

router.get('/limited', getLimitedNewsPreview);
router.get('/:id', getNewPreviewById);
router.post('/publish/preview', publishNewPreview);
router.get('/by-topic/:topic', getNewsPreviewByTopic);

export default router;

import express from 'express';

import { getLimitedNewsPreview, getNewPreviewById, publishNewPreview } from '../controllers/news-preview.js';

const router = express.Router();

router.get('/limited', getLimitedNewsPreview);
router.get('/:id', getNewPreviewById);
router.post('/publish/preview', publishNewPreview);

export default router;

import express from 'express';

import { getLimitedNewsPreview, getNewPreviewById } from '../controllers/news-preview.js';

const router = express.Router();

router.get('/limited', getLimitedNewsPreview);
router.get('/:id', getNewPreviewById);

export default router;

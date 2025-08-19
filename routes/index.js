import express from 'express';

import { getLimitedNewsPreview } from '../controllers/news-preview.js';

const router = express.Router();

router.get('/limited', getLimitedNewsPreview);

export default router;

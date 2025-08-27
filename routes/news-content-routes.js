import express from 'express';
import { getFullNewContent, createNewContent } from '../controllers/news-content.js';

const router = express.Router();

router.get('/:id', getFullNewContent);
router.post('/insert/content', createNewContent);

export default router;

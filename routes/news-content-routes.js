import express from 'express';
import { getFullNewContent } from '../controllers/news-content.js';

const router = express.Router();

router.get('/:id', getFullNewContent);

export default router;

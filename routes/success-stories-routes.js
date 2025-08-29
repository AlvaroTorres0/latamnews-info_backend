import express from 'express';

import { getLimitedSuccessStories, publishNewSuccessStory } from '../controllers/success-stories.js';

const router = express.Router();

router.get('/limited', getLimitedSuccessStories);
router.post('/publish/story', publishNewSuccessStory);

export default router;

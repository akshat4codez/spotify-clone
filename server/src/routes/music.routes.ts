import { Router } from 'express';
import { lyrics, search, trending } from '../controllers/music.controller';

const router = Router();
router.get('/search', search);
router.get('/trending', trending);
router.get('/lyrics', lyrics);
export default router;

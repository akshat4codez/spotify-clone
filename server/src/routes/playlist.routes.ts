import { Router } from 'express';
import { auth } from '../middleware/auth';
import { createPlaylist, deletePlaylist, getPlaylist, listPlaylists, updatePlaylist } from '../controllers/playlist.controller';

const router = Router();
router.use(auth);
router.get('/', listPlaylists);
router.post('/', createPlaylist);
router.get('/:id', getPlaylist);
router.patch('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);
export default router;

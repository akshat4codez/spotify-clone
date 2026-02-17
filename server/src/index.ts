import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { connectDb } from './config/db';
import authRoutes from './routes/auth.routes';
import playlistRoutes from './routes/playlist.routes';
import musicRoutes from './routes/music.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/youtube', musicRoutes);

app.listen(env.port, async () => {
  await connectDb();
  console.log(`API running on ${env.port}`);
});

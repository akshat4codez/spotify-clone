import { Request, Response } from 'express';
import { getTrendingYouTube, searchYouTube } from '../services/youtube.service';
import { getLyrics } from '../services/lyrics.service';

export async function search(req: Request, res: Response) {
  const items = await searchYouTube(String(req.query.q || ''));
  res.json({ items });
}

export async function trending(_req: Request, res: Response) {
  const items = await getTrendingYouTube();
  res.json({ items });
}

export async function lyrics(req: Request, res: Response) {
  const { artist, title } = req.query as { artist: string; title: string };
  const data = await getLyrics(artist, title);
  res.json(data);
}

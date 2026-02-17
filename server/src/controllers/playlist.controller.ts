import { Response } from 'express';
import { PlaylistModel } from '../models/playlist.model';
import { AuthedRequest } from '../middleware/auth';

export async function listPlaylists(req: AuthedRequest, res: Response) {
  const playlists = await PlaylistModel.find({ userId: req.userId }).sort({ updatedAt: -1 });
  res.json({ playlists });
}

export async function getPlaylist(req: AuthedRequest, res: Response) {
  const playlist = await PlaylistModel.findOne({ _id: req.params.id, userId: req.userId });
  if (!playlist) return res.status(404).json({ message: 'Not found' });
  res.json({ playlist });
}

export async function createPlaylist(req: AuthedRequest, res: Response) {
  const playlist = await PlaylistModel.create({ userId: req.userId, name: req.body.name, tracks: [] });
  res.status(201).json({ playlist });
}

export async function updatePlaylist(req: AuthedRequest, res: Response) {
  const playlist = await PlaylistModel.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { name: req.body.name, tracks: req.body.tracks },
    { new: true }
  );
  if (!playlist) return res.status(404).json({ message: 'Not found' });
  res.json({ playlist });
}

export async function deletePlaylist(req: AuthedRequest, res: Response) {
  await PlaylistModel.deleteOne({ _id: req.params.id, userId: req.userId });
  res.status(204).send();
}

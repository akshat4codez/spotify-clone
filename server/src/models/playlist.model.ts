import mongoose, { Schema } from 'mongoose';

const TrackSchema = new Schema({
  youtubeId: String,
  title: String,
  artist: String,
  thumbnail: String,
  duration: String
}, { _id: false });

const PlaylistSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  tracks: [TrackSchema]
}, { timestamps: true });

export const PlaylistModel = mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);

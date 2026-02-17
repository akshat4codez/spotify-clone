import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT || 4000),
  mongodbUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  youtubeApiKey: process.env.YOUTUBE_API_KEY || '',
  geniusApiKey: process.env.GENIUS_API_KEY || ''
};

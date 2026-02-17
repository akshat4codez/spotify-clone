import mongoose from 'mongoose';
import { env } from './env';

export async function connectDb() {
  if (!env.mongodbUri) throw new Error('MONGODB_URI missing');
  await mongoose.connect(env.mongodbUri);
}

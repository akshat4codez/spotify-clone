import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type AuthedRequest = Request & { userId?: string };

export function auth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { sub: string };
    req.userId = decoded.sub;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

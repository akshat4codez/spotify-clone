import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { env } from '../config/env';

export async function signup(req: Request, res: Response) {
  const { email, password, name } = req.body;
  const exists = await UserModel.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ email, passwordHash, name });
  const token = jwt.sign({}, env.jwtSecret, { subject: String(user._id), expiresIn: '7d' });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({}, env.jwtSecret, { subject: String(user._id), expiresIn: '7d' });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
}

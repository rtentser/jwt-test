import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import { generateTokens } from '../utils/token.js';
import jwt from 'jsonwebtoken';
import { REFRESH_SECRET } from '../config/jwt.js';

export const signup = async (req, res) => {
  const { id, password } = req.body;
  await User.create({ id, password });
  const tokens = generateTokens({ id });
  await RefreshToken.create({ userId: id, token: tokens.refresh });
  res.json(tokens);
};

export const signin = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ where: { id, password } });
  if (!user) return res.status(401).json({ error: 'Invalid' });
  const tokens = generateTokens({ id });
  await RefreshToken.create({ userId: id, token: tokens.refresh });
  res.json(tokens);
};

export const newToken = async (req, res) => {
  const { refresh } = req.body;
  try {
    const decoded = jwt.verify(refresh, REFRESH_SECRET);
    const found = await RefreshToken.findOne({ where: { userId: decoded.id, token: refresh } });
    if (!found) return res.status(403).json({ error: 'Invalid refresh' });
    const tokens = generateTokens({ id: decoded.id });
    await RefreshToken.create({ userId: decoded.id, token: tokens.refresh });
    res.json(tokens);
  } catch (e) {
    res.status(403).json({ error: 'Invalid refresh' });
  }
};

export const logout = async (req, res) => {
  // remove only the current device's refresh token(s) - to match 'logout current device' behavior we expect client to send refresh token
  const { refresh } = req.body;
  if (refresh) {
    await RefreshToken.destroy({ where: { token: refresh } });
    return res.json({ message: 'Logged out (this device)' });
  }
  // fallback: delete all user's refresh tokens (logout everywhere)
  await RefreshToken.destroy({ where: { userId: req.user.id } });
  res.json({ message: 'Logged out' });
};

import jwt from 'jsonwebtoken';
import { ACCESS_SECRET, REFRESH_SECRET, ACCESS_EXPIRE } from '../config/jwt.js';

export const generateTokens = (payload) => {
  const access = jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRE });
  const refresh = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '30d' });
  return { access, refresh };
};

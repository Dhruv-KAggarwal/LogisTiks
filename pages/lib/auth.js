// lib/auth.js
import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export function authenticate(req, res, next) {
  const cookies = req.headers.cookie ? require('cookie').parse(req.headers.cookie) : {};
  const token = cookies.authToken;

  if (token && verifyToken(token)) {
    req.user = verifyToken(token);
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

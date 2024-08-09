// pages/api/check-auth.js
import { parse } from 'cookie';

export default function handler(req, res) {
  const { authToken } = parse(req.headers.cookie || '');

  // For demonstration, assume a specific token indicates authentication
  if (authToken === 'dummy-token') {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(200).json({ authenticated: false });
  }
}

// pages/api/login.js
import { serialize } from 'cookie';

export default async function handler(req, res) {
  const { username, password } = req.body;

  // Simple authentication check
  if (username === 'test' && password === 'test') {
    // Generate a token (for simplicity, using a dummy token)
    const token = 'dummy-token'; // Replace with actual token generation

    // Set a cookie with the token
    res.setHeader('Set-Cookie', serialize('authToken', token, {
      httpOnly: true,
      path: '/',
      maxAge: 3600, // 1 hour
    }));

    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
}

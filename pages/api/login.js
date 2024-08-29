// pages/api/login.js
import { serialize } from 'cookie';

export default async function handler(req, res) {
  const { username, password, userID } = req.body;

  console.log('Received data:', { username, password, userID }); // Debugging log

  // Simple authentication check
  if (
    username === 'test' &&
    password === 'test' &&
    (userID === '1111' || /^[0-9]{10}$/.test(userID)) // Check if userID is '1111' or a 10-digit phone number
  ) {
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
    console.log('Invalid credentials:', { username, password, userID }); // Debugging log
    res.status(401).json({ error: 'Invalid username, password, or userID' });
  }
}

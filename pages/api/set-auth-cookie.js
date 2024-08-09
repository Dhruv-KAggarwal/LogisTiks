// pages/api/set-auth-cookie.js
export default function handler(req, res) {
    res.setHeader('Set-Cookie', 'authToken=mock-token; HttpOnly; Path=/');
    res.status(200).json({ message: 'Auth cookie set' });
  }
  
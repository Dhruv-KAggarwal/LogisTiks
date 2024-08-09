// pages/api/simulate-login.js
import { setMockAuthToken } from '../lib/mock-auth';

export default function handler(req, res) {
  setMockAuthToken(res);
  res.status(200).json({ message: 'Simulated login successful' });
}

// pages/api/protected.js
import { authenticate } from '../../lib/auth';

export default function handler(req, res) {
  authenticate(req, res, () => {
    res.status(200).json({ message: 'This is protected data' });
  });
}

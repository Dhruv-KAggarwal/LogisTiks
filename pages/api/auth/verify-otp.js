import { verifyOtp } from '../../utils/otp'; // Implement your OTP verification logic here

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { otp } = req.body;
    const user = await verifyOtp(otp);
    if (user) {
      // Set session or token for authenticated user
      res.status(200).json({ message: 'OTP verified' });
    } else {
      res.status(401).json({ error: 'Invalid OTP' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

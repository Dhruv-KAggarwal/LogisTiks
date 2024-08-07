// pages/api/auth/send-otp.js
import nextConnect from 'next-connect';
import { sendOtp } from '../../utils/otp'; // Ensure the path is correct

const handler = nextConnect({
  onError: (err, req, res) => {
    res.status(500).json({ error: `Something went wrong! ${err.message}` });
  },
});

handler.post(async (req, res) => {
  const { contact, method } = req.body;
  try {
    const success = await sendOtp(contact, method);
    if (success) {
      res.status(200).json({ message: 'OTP sent' });
    } else {
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
});

export default handler;

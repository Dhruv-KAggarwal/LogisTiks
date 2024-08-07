// pages/api/send-otp.js
import { NextResponse } from 'next/server';
import { sendOtpToMobile } from '../utilis/otp.js'; // Implement this function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { mobileNo } = req.body;
  if (!mobileNo) {
    return res.status(400).json({ message: 'Mobile number is required.' });
  }

  const result = await sendOtpToMobile(mobileNo);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
}
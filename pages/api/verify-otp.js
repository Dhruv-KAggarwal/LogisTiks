// pages/api/verify-otp.js
import { NextResponse } from 'next/server';
import { verifyOtp } from '../utils/otp.js'; // Implement this function

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { mobileNo, otp } = req.body;
  if (!mobileNo || !otp) {
    return res.status(400).json({ message: 'Mobile number and OTP are required.' });
  }

  const isValid = await verifyOtp(mobileNo, otp);
  if (isValid) {
    res.status(200).json({ success: true, message: 'OTP verified successfully.' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP.' });
  }
}
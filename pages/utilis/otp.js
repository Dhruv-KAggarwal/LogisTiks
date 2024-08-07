import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db('your-database');
  }
  return db;
}

export async function sendOtpToMobile(mobileNo) {
  const otp = generateOtp();
  const db = await connectToDB();

  await db.collection('otps').insertOne({ mobileNo, otp });

  // Send OTP via SMS using Twilio
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobileNo
    });
    return { success: true, message: 'OTP sent successfully.' };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, message: 'Failed to send OTP.' };
  }
}

export async function verifyOtp(mobileNo, otp) {
  const db = await connectToDB();
  const record = await db.collection('otps').findOne({ mobileNo, otp });
  if (record) {
    await db.collection('otps').deleteOne({ mobileNo, otp });
    return true;
  }
  return false;
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

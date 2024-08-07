// pages/login.js
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [mobileNo, setMobileNo] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState('enterMobile'); // 'enterMobile' or 'enterOtp'
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('/api/send-otp', { mobileNo });
      setMessage(response.data.message);
      setStage('enterOtp');
    } catch (error) {
      setMessage('Error sending OTP.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/verify-otp', { mobileNo, otp });
      if (response.data.success) {
        setMessage('Login successful!');
        // Redirect or perform other actions
      } else {
        setMessage('Invalid OTP.');
      }
    } catch (error) {
      setMessage('Error verifying OTP.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {stage === 'enterMobile' && (
          <div>
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <button
              onClick={handleSendOtp}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Send OTP
            </button>
          </div>
        )}
        {stage === 'enterOtp' && (
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Login
            </button>
          </div>
        )}
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
}

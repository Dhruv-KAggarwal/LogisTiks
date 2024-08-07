import { useState } from 'react';

export default function VerifyPage() {
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the OTP to your API endpoint for verification
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp }),
    });
    if (res.ok) {
      // Redirect to protected page or show success message
      window.location.href = '/protected';
    } else {
      // Handle errors
    }
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <form onSubmit={handleSubmit}>
        <label>
          OTP:
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </label>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

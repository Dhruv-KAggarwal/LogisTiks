import { useState } from 'react';

export default function AuthPage() {
  const [contact, setContact] = useState('');
  const [method, setMethod] = useState('email'); // Default to email

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the contact and method to your API endpoint for OTP generation
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact, method }),
    });
    if (res.ok) {
      // Redirect or show success message
    } else {
      // Handle errors
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email or Mobile Number:
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="radio"
            name="method"
            value="email"
            checked={method === 'email'}
            onChange={(e) => setMethod(e.target.value)}
          />
          Email
        </label>
        <label>
          <input
            type="radio"
            name="method"
            value="mobile"
            checked={method === 'mobile'}
            onChange={(e) => setMethod(e.target.value)}
          />
          Mobile
        </label>
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}

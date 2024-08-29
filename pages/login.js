import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState(''); // Added state for userID
  const [error, setError] = useState('');
  const router = useRouter();
  const { message } = router.query; // Capture the message from the query params

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { username, password, userID }); // Include userID in the request body
      document.cookie = `authToken=${response.data.token}; Path=/; HttpOnly`;
      router.push('/protected/home'); // Redirect to a protected page after login
    } catch (err) {
      setError('Invalid username, password, or userID');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {message && <p className="text-red-500 mb-4">{message}</p>} {/* Display the message if it exists */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4"> {/* New input for userID */}
            <label className="block text-gray-700">User ID / Phone Number</label>
            <input
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

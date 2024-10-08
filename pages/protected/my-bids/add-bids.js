import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

export default function AddBids() {
  const [operator, setOperator] = useState('');
  const [departure, setDeparture] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!operator || !departure || !duration) {
      setError('All fields are required');
      return;
    }

    setLoading(true); // Start loading
    setError(''); // Clear any previous errors

    try {
      const response = await axios.post('/api/protected/add-bids', {
        operator,
        departure,
        duration,
      });

      // Reset the form fields upon successful submission
      setOperator('');
      setDeparture('');
      setDuration('');

      // Redirect to the same page to reset the form or to another valid route
      // router.push('/protected/mytrucks'); // Uncomment and set a valid path if needed
    } catch (err) {
      // Check for specific error response
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Display specific error message from the server
      } else {
        setError('Failed to add bids. Please try again.');
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Add Bids</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Operator</label>
            <input
              type="text"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Departure</label>
            <input
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Adding...' : 'Add Bids'}
          </button>
        </form>
      </div>
    </div>
  );
}

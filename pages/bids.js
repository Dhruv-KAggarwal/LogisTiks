// pages/bids.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Bids = () => {
  const [bids, setBids] = useState([]);
  const [selectedBid, setSelectedBid] = useState(null);
  const [price, setPrice] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('/api/bids');
        setBids(response.data);
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };

    fetchBids();
  }, []);

  const handleParticipate = (bid) => {
    setSelectedBid(bid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBid || !price) return;

    try {
      await axios.post('/api/submitBid', { bidId: selectedBid._id, price });
      alert('Bid submitted!');
      setPrice('');
      setSelectedBid(null);
      // Refresh bids list
      const response = await axios.get('/api/bids');
      setBids(response.data);
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bids</h1>
      <button
        onClick={() => router.push('/addbids')}
        className="bg-green-500 text-white py-2 px-4 rounded-lg mb-4"
      >
        Add New Bid
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bids.map(bid => (
          <div key={bid._id} className="border rounded-lg p-4 shadow-md bg-white">
            <img src={bid.imageUrl} alt="Parcel" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold mb-2">{bid.destination}</h2>
            <p className="mb-2"><strong>From:</strong> {bid.from}</p>
            <p className="mb-2"><strong>To:</strong> {bid.to}</p>
            <p className="mb-2"><strong>Weight:</strong> {bid.weight} kg</p>
            <p className="mb-2"><strong>Dimensions:</strong> {bid.dimensions} cm</p>
            {bid.price ? (
              <p className="mb-4"><strong>Price Offered:</strong> ${bid.price}</p>
            ) : (
              <button
                onClick={() => handleParticipate(bid)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Participate
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedBid && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Submit Your Price</h2>
            <p className="mb-4"><strong>Destination:</strong> {selectedBid.destination}</p>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Your Price:
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full mt-1 border rounded-lg p-2"
                  required
                />
              </label>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setSelectedBid(null)}
                className="ml-2 bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bids;

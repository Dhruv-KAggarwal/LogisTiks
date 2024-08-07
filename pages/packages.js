import { useState, useEffect } from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import clientPromise from './lib/mongodb';

// Packages Component
const Packages = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [route, setRoute] = useState('Direct');
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetch('/api/packages');
      const data = await response.json();
      setPackages(data);
    };

    fetchPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, date, route }),
    });

    // Refresh packages list
    const response = await fetch('/api/packages');
    const data = await response.json();
    setPackages(data);
  };

  return (
    <div className="bg-[#fdfff0] min-h-screen">
      <div className="container mx-auto py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Find Packages</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">From</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">To</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Route</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              >
                <option value="Direct">Direct</option>
                <option value="Connecting">Connecting</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Available Packages</h3>
          {packages
            .filter(
              (pkg) =>
                (!from || pkg.from.toLowerCase().includes(from.toLowerCase())) &&
                (!to || pkg.to.toLowerCase().includes(to.toLowerCase())) &&
                (!date || pkg.date === date) &&
                (!route || pkg.route === route)
            )
            .map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <p><strong>From:</strong> {pkg.from}</p>
                <p><strong>To:</strong> {pkg.to}</p>
                <p><strong>Date:</strong> {pkg.date}</p>
                <p><strong>Route:</strong> {pkg.route}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <Link href="/addbid">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700">
            Add Bid
          </button>
        </Link>
        <Link href="/trucks">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700">
            See Trucks
          </button>
        </Link>
      </div>
    </div>
  );
};

// Trucks Component
const Trucks = ({ trucks = [] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Trucks</h1>
      <div className="flex justify-end mb-4">
        <Link href="/add-truck">
          <button className="mb-4 p-2 bg-blue-500 text-white rounded">Add Truck</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {trucks.length > 0 ? (
          trucks.map((truck) => (
            <div key={truck._id} className="border p-4 rounded shadow-lg flex flex-col md:flex-row">
              <div className="md:w-1/4 flex justify-center items-center">
                <Image src="" alt="Truck Logo" width={100} height={100} />
              </div>
              <div className="md:w-3/4 pl-4">
                <h2 className="text-xl font-bold mb-2">{truck.operator}</h2>
                <div className="text-gray-600 mb-2 flex justify-between">
                  <div>
                    <span className="font-semibold">Departure: </span>{truck.departure}
                  </div>
                  <div>
                    <span className="font-semibold">Duration: </span>{truck.duration}
                  </div>
                </div>
                <div className="text-gray-600 mb-2 flex justify-between">
                  <div>
                    <span className="font-semibold">Arrival: </span>{truck.arrival}
                  </div>
                  <div>
                    <span className="font-semibold">Date: </span>{truck.date}
                  </div>
                </div>
                <div className="text-gray-600 mb-2 flex justify-between">
                  <div>
                    <span className="font-semibold">Rating: </span>{truck.rating}
                  </div>
                  <div>
                    <span className="font-semibold">Price: </span>{truck.price}
                  </div>
                </div>
                <div className="text-gray-600 mb-2 flex justify-between">
                  <div>
                    <span className="font-semibold">Seats Available: </span>{truck.seatsAvailable}
                  </div>
                  <div>
                    <span className="font-semibold">Single Seats: </span>{truck.singleSeats}
                  </div>
                </div>
                <div className="text-gray-600 mb-2 flex justify-between">
                  <div>
                    <button className="bg-green-500 text-white p-2 rounded">View Seats</button>
                  </div>
                  <div>
                    <Link href={`/truck/${truck._id}`}>
                      <button className="bg-blue-500 text-white p-2 rounded">View Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No trucks available.</p>
        )}
      </div>
    </div>
  );
};

// Fetch Trucks Data
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db('your-database-name');
    const trucks = await db.collection('trucks').find({}).toArray();
    return {
      props: {
        trucks: JSON.parse(JSON.stringify(trucks)),
      },
    };
  } catch (error) {
    console.error('Failed to fetch trucks:', error);
    return {
      props: {
        trucks: [],
      },
    };
  }
}

export default Packages;

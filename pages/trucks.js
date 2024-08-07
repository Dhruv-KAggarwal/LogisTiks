import Link from 'next/link';
import { MongoClient } from 'mongodb';
import Image from 'next/image';

export default function Trucks({ trucks = [] }) {
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
}

export async function getServerSideProps() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('your-database-name');
    const trucks = await db.collection('trucks').find({}).toArray();
    client.close();

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

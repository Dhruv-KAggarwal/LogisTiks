import Link from 'next/link';
import { MongoClient } from 'mongodb';
import Image from 'next/image';

const MyTrucks = ({ trucks = [] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Trucks</h1>
      <div className="flex justify-end mb-4">
        {/* Add Your Truck button */}
        <Link href="/protected/add-truck">
          <button className="p-2 bg-green-500 text-white rounded">Add Your Truck</button>
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
                {/* Add other fields similarly */}
                <div className="text-gray-600 mb-2 flex justify-between">
                  <div>
                    <Link href={`/edit-truck/${truck._id}`}>
                      <button className="bg-blue-500 text-white p-2 rounded">Edit Truck</button>
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

export async function getServerSideProps(context) {
  const userId = context.req.cookies.userId; // Replace with your authentication logic

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('our-database-name');
    const trucks = await db.collection('trucks').find({ userId }).toArray();
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

export default MyTrucks;

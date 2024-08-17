import Link from 'next/link';
import { MongoClient } from 'mongodb';
import Image from 'next/image';

const MyBids = ({ bids = [] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bids</h1>
      <div className="flex justify-end mb-4">
        {/* Add Your Truck button */}
        <Link href="/protected/my-bids/add-bids">
          <button className="p-2 bg-green-500 text-white rounded">Add Your Bids</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {bids.length > 0 ? (
          bids.map((bids) => (
            <div key={bids._id} className="border p-4 rounded shadow-lg flex flex-col md:flex-row">
              <div className="md:w-1/4 flex justify-center items-center">
                <Image src="" alt="bids Logo" width={100} height={100} />
              </div>
              <div className="md:w-3/4 pl-4">
                <h2 className="text-xl font-bold mb-2">{bids.operator}</h2>
                <div className="text-gray-600 mb-2 flex justify-between">
                  <div>
                    <span className="font-semibold">Departure: </span>{bids.departure}
                  </div>
                  <div>
                    <span className="font-semibold">Duration: </span>{bids.duration}
                  </div>
                </div>
                {/* Add other fields similarly */}
                <div className="text-gray-600 mb-2 flex justify-between">
                  <div>
                    <Link href={`/edit-bids/${bids._id}`}>
                      <button className="bg-blue-500 text-white p-2 rounded">Edit Bids</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Bids available.</p>
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
    const bids = await db.collection('bids').find({ userId }).toArray();
    client.close();

    return {
      props: {
        bids: JSON.parse(JSON.stringify(bids)),
      },
    };
  } catch (error) {
    console.error('Failed to fetch bids:', error);
    return {
      props: {
        bids: [],
      },
    };
  }
}

export default MyBids;

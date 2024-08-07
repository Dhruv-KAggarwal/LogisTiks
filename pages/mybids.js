// pages/mybids.js
import Link from 'next/link';
import { MongoClient } from 'mongodb';

const MyBids = ({ bids = [] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bids</h1>
      <div className="grid grid-cols-1 gap-4">
        {bids.length > 0 ? (
          bids.map((bid) => (
            <div key={bid._id} className="border p-4 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-2">{bid.title}</h2>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Description: </span>{bid.description}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Amount: </span>{bid.amount}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Status: </span>{bid.status}
              </div>
              <div className="text-gray-600 mb-2">
                <Link href={`/edit-bid/${bid._id}`}>
                  <button className="bg-blue-500 text-white p-2 rounded">Edit Bid</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No bids available.</p>
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

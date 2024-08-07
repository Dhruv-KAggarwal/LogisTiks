// pages/mypackages.js
import Link from 'next/link';
import { MongoClient } from 'mongodb';

const MyPackages = ({ packages = [] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Packages</h1>
      <div className="grid grid-cols-1 gap-4">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div key={pkg._id} className="border p-4 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Description: </span>{pkg.description}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Weight: </span>{pkg.weight}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Dimensions: </span>{pkg.dimensions}
              </div>
              <div className="text-gray-600 mb-2">
                <Link href={`/edit-package/${pkg._id}`}>
                  <button className="bg-blue-500 text-white p-2 rounded">Edit Package</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No packages available.</p>
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
    const packages = await db.collection('packages').find({ userId }).toArray();
    client.close();

    return {
      props: {
        packages: JSON.parse(JSON.stringify(packages)),
      },
    };
  } catch (error) {
    console.error('Failed to fetch packages:', error);
    return {
      props: {
        packages: [],
      },
    };
  }
}

export default MyPackages;

// pages/account.js
import { MongoClient } from 'mongodb';
// import { getSession } from 'next-auth/react'; // Assuming you're using next-auth for authentication

const Account = ({ user }) => {
  if (!user) {
    return <p>You need to be logged in to view this page.</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-[#fdfff0]">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">User Details</h2>
        <div className="mb-4">
          <span className="font-bold">Name:</span> {user.name}
        </div>
        <div className="mb-4">
          <span className="font-bold">Email:</span> {user.email}
        </div>
        <div className="mb-4">
          <span className="font-bold">Address:</span> {user.address}
        </div>
        <div className="mb-4">
          <span className="font-bold">Phone Number:</span> {user.phoneNumber}
        </div>
        <div className="text-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !session.user) {
    return {
      props: {
        user: null,
      },
    };
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db('your-database-name');
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ email: session.user.email });

    client.close();

    return {
      props: {
        user: user ? JSON.parse(JSON.stringify(user)) : null,
      },
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return {
      props: {
        user: null,
      },
    };
  }
}

export default Account;

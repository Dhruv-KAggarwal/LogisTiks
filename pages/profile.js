// pages/profile.js
import Link from 'next/link';

const Profile = () => {
  return (
    <div className="bg-[#fdfff0] min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="space-y-4">
        <Link href="/mytrucks" passHref>
          <div className="text-center bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 cursor-pointer mb-10 ml-96 mr-96 ">
            My Trucks
          </div>
        </Link>
        <Link href="/mypackages" passHref>
          <div className="text-center bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 cursor-pointer mb-10 ml-96 mr-96">
            My Packages
          </div>
        </Link>
        <Link href="/mybids" passHref>
          <div className="text-center bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 cursor-pointer ml-96 mr-96">
            My Bids
          </div>
        </Link>
        <Link href="/account" passHref>
          <div className="text-center bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 cursor-pointer mt-10 ml-96 mr-96">
            Account Settings
          </div>
        </Link>
        <Link href="/contact" passHref>
          <div className="text-center bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 cursor-pointer mt-10 ml-96 mr-96">
            Contact Us
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Profile;

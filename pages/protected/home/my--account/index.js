// pages/my-account.js
import Link from 'next/link';
import Router from 'next/router';

export default function MyAccount() {
  return (
    <div className="bg-[#fdfff0] min-h-screen flex flex-col md:flex-row">
      {/* Column Container */}
      <div className="flex flex-col w-full md:w-1/4">
        <Link href="/protected/my-trucks">
          <div className="flex-1 p-4 text-center bg-blue-200 hover:bg-blue-300 transition-colors cursor-pointer">
            My Trucks
          </div>
        </Link>
        <Link href="/protected/my-packages">
          <div className="flex-1 p-4 text-center bg-green-200 hover:bg-green-300 transition-colors cursor-pointer">
            My Packages
          </div>
        </Link>
        <Link href="/protected/my-bids">
          <div className="flex-1 p-4 text-center bg-yellow-200 hover:bg-yellow-300 transition-colors cursor-pointer">
            My Bids
          </div>
        </Link>
        <Link href="/contact">
          <div className="flex-1 p-4 text-center bg-red-200 hover:bg-red-300 transition-colors cursor-pointer">
            Contact Us
          </div>
        </Link>
      </div>
    </div>
  );
}

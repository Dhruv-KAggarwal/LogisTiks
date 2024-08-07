// components/Hero.js

import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img 
        src="https://static.wixstatic.com/media/11062b_d00e49cf48f14a40adda61b8c7abbe27~mv2_d_4700_3137_s_4_2.jpg/v1/fill/w_1349,h_721,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_d00e49cf48f14a40adda61b8c7abbe27~mv2_d_4700_3137_s_4_2.jpg" 
        alt="Hero Image" 
        className="w-full h-[630px] object-cover"
      />
      {/* Overlay Box */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-[#fdfff0] bg-opacity-90 text-center relative" style={{ height: '500px', width: '500px' }}>
          {/* Hidden Box for Heading */}
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-balance" style={{ width: '278px', height: '190px', overflow: 'hidden' }}>
            <div className="text-5xl font-bold text-gray-900 leading-tight" style={{ height: '100%' }}>
              Welcome to LogisTiks
            </div>
          </div>
          {/* Hidden Box for Description */}
          <div className="absolute  bottom-1/3 left-1/2 transform -translate-x-1/2" style={{ width: '402px', height: '115px', overflow: 'hidden' }}>
            <p className="text-lg text-gray-700">
              Discover a seamless logistics experience with LogisTiks. Our platform offers efficient solutions for all your transportation needs. Sign up today to access exclusive features and personalized services.
            </p>
          </div>
          {/* Buttons */}
          <div className="absolute bottom-20 left-1/2 r transform -translate-x-1/2 flex gap-5">
            <Link href="/create-account">
              <span className="bg-gray-700 text-white px-6 py-3 rounded-md text-sm font-medium cursor-pointer">Create Account</span>
            </Link>
            <Link href="/login">
              <span className="bg-gray-700 text-white px-6 py-3 rounded-md text-sm font-medium cursor-pointer">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

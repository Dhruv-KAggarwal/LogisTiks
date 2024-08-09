import React from 'react';


const Service = () => {
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  return (
    <div className="bg-[#fdfff0] p-8">
      <h1 className="text-center text-2xl font-bold mb-8">Services</h1>
      <div className="flex flex-col md:flex-row justify-around gap-6">
        <div 
          className="service-item cursor-pointer text-center" 
          onClick={() => handleRedirect('/trucks')}
        >
          <img 
            src="https://static.wixstatic.com/media/d78a0b_ffce583f7c1d4313a9ce65bcb9e0f89e~mv2.jpg/v1/fill/w_286,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Truck%20moving%20in%20clean%20ans%20developed%20road.jpg" 
            alt="See Nearby Trucks" 
            className="w-286 h-335 object-cover"
          />
          <p className="mt-4 text-lg font-semibold">See Nearby Trucks</p>
        </div>
        
        <div 
          className="service-item cursor-pointer text-center" 
          onClick={() => handleRedirect('packages')}
        >
          <img 
            src="https://static.wixstatic.com/media/d78a0b_18d0e9e8666948178bd8bc1ea6071715~mv2.jpg/v1/crop/x_75,y_0,w_874,h_1024/fill/w_286,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/parcel%20packed%20fuly%20for%20logistics%20in%20card.jpg" 
            alt="See Nearby Supplies" 
            className="w-286 h-335 object-cover"
          />
          <p className="mt-4 text-2xl font-semibold">See Nearby Supplies</p>
        </div>

        <div 
          className="service-item cursor-pointer text-center" 
          onClick={() => handleRedirect('contact')}
        >
          <img 
            src="https://static.wixstatic.com/media/a3c153_bc49e48a99bb47f09010861edb8c15ef~mv2.png/v1/fill/w_286,h_335,al_c,q_85,enc_auto/alex-mNJ7c7-XCZQ-unsplash.png" 
            alt="Contact Us" 
            className="w-286 h-335 object-cover"
          />
          <p className="mt-4 text-lg font-semibold">Contact Us</p>
        </div>

        <div 
          className="service-item cursor-pointer text-center" 
          onClick={() => handleRedirect('bidding.js')}
        >
          <img 
            src="https://static.wixstatic.com/media/a3c153_151c591eca5d4f00ba4939ad2b83458c~mv2.jpg/v1/crop/x_0,y_713,w_4000,h_4573/fill/w_286,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/pierre-chatel-innocenti-muMR2IhCbZ0-unsplash.jpg" 
            alt="Bidding" 
            className="w-286 h-335 object-cover"
          />
          <p className="mt-4 text-lg font-semibold">Bidding</p>
        </div>
      </div>
    </div>
  );
};

export default Service;

import React from 'react';

const About = () => {
  return (
    <div className="bg-[#fdfff0] py-16 px-4 min-h-screen flex flex-col items-center">
      <div className="bg-[#F8F8F8CC] w-[1000px] h-[700px] flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-5xl font-bold text-center mb-6">About Us</h1>
        </div>
        <img 
          src="https://static.wixstatic.com/media/a3c153_20122b9a32cc4e9a9faca835b9f82d14~mv2.jpg/v1/fill/w_706,h_446,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/yiranding-yOWUAKYk46Y-unsplash%252520copy_.jpg" 
          alt="About Us" 
          className="w-[850px] h-[445px] object-cover"
        />
      </div>

      <div className="bg-[#fdfff0] w-[980px] mt-8 p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-[265px] h-[130px] bg-[#fdfff0] p-4">
            <h3 className="text-3xl font-bold">Our Story</h3>
          </div>
          <div className="w-full md:w-[618px] h-auto p-4">
            <p>
              Welcome to Logistiks, your number one source for all things logistics. We're dedicated to providing you the best of services, with a focus on dependability, customer service, and efficiency.
            </p>
            <p>
              Founded in [year] by [Founder's Name], Logistiks has come a long way from its beginnings. When [Founder's Name] first started out, their passion for [passion or reason for starting the business] drove them to start their own business.
            </p>
            <p>
              We hope you enjoy our services as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
            </p>
            <p>Sincerely,</p>
            <p>[Founder's Name]</p>
          </div>
        </div>
      </div>

      <div className="bg-[#fdfff0] w-[980px] mt-8 p-4 text-center">
        <h1 className="text-4xl font-bold mb-8">LogisTiks</h1>
        <div className="flex flex-col md:flex-row justify-center mb-8">
          <div className="mb-4 md:mb-0 md:mr-8">
            <p className="text-lg">123-456-7890</p>
            <p className="text-lg">info@mysite.com</p>
          </div>
          <div>
            <p className="text-lg">500 Terry Francine Street,</p>
            <p className="text-lg">6th Floor, San Francisco,</p>
            <p className="text-lg">CA 94158</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

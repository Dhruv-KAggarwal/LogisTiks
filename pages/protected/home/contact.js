import React from 'react';

const Contact = () => {
    return (
        <div className="bg-[#fdfff0] py-16 px-4 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-4xl text-center">
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
                <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <form className="flex flex-col items-center">
                    <input 
                        type="email" 
                        placeholder="Enter your email address *" 
                        className="p-2 mb-4 border border-gray-300 rounded w-full max-w-sm"
                    />
                    <button 
                        type="submit" 
                        className="bg-yellow-500 text-white py-2 px-4 rounded">
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const reviews = [
    {
        text: "Have customers review you and share what they had to say. Click to edit and add their testimonial.",
        name: "Alexa Young",
        location: "CA",
        image: "https://static.wixstatic.com/media/d78a0b_ffce583f7c1d4313a9ce65bcb9e0f89e~mv2.jpg/v1/fill/w_998,h_485,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Truck%20moving%20in%20clean%20ans%20developed%20road.jpg"
    },
    {
        text: "Another review text goes here. Click to edit and add their testimonial.",
        name: "John Doe",
        location: "NY",
        image: "https://static.wixstatic.com/media/d78a0b_ffce583f7c1d4313a9ce65bcb9e0f89e~mv2.jpg/v1/fill/w_998,h_485,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Truck%20moving%20in%20clean%20ans%20developed%20road.jpg"
    },
    {
        text: "Yet another review text. Click to edit and add their testimonial.",
        name: "Jane Smith",
        location: "TX",
        image: "https://static.wixstatic.com/media/d78a0b_ffce583f7c1d4313a9ce65bcb9e0f89e~mv2.jpg/v1/fill/w_998,h_485,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Truck%20moving%20in%20clean%20ans%20developed%20road.jpg"
    }
];

const ReviewCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const nextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    const goToReview = (index) => {
        setCurrentIndex(index);
    };

    if (!isMounted) {
        return null; // Optionally, you can return a loading spinner or message
    }

    return (
        <div className="bg-[#fdfff0] p-6 rounded-lg shadow-lg">
            <div className="relative overflow-hidden w-full max-w-3xl mx-auto h-[485px]">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={review.image}
                            alt={`Review ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                            <p className="text-white text-xl text-center px-4">{`"${review.text}"`}</p>
                            <p className="text-white mt-2">{`${review.name}, ${review.location}`}</p>
                        </div>
                    </div>
                ))}
                <button
                    onClick={prevReview}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
                >
                    &#9664;
                </button>
                <button
                    onClick={nextReview}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
                >
                    &#9654;
                </button>
            </div>
            <div className="flex mt-4 justify-center space-x-2">
                {reviews.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToReview(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

const Home = () => {
  return (
    <div className="bg-[#fdfff0] min-h-screen">
      <ReviewCarousel />
    </div>
  );
};

export default Home;

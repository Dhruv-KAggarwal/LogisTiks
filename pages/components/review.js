import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const reviews = [
    {
        text: "Have customers review you and share what they had to say. Click to edit and add their testimonial.",
        name: "Alexa Young",
        location: "CA",
        image: "path/to/image1.jpg" // replace with your actual image path
    },
    {
        text: "Another review text goes here. Click to edit and add their testimonial.",
        name: "John Doe",
        location: "NY",
        image: "..\\review1.jpg" // replace with your actual image path
    },
    {
        text: "Yet another review text. Click to edit and add their testimonial.",
        name: "Jane Smith",
        location: "TX",
        image: "../truck.jpg" // replace with your actual image path
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
        return null; // or a loading spinner if desired
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-2xl">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img src={review.image} alt={`Review ${index + 1}`} className="w-full h-64 object-cover" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                            <p className="text-white text-xl text-center">{`"${review.text}"`}</p>
                            <p className="text-white mt-2">{`${review.name}, ${review.location}`}</p>
                        </div>
                    </div>
                ))}
                <button
                    onClick={prevReview}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                >
                    &#9664;
                </button>
                <button
                    onClick={nextReview}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                >
                    &#9654;
                </button>
            </div>
            <div className="flex mt-4 space-x-2">
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

export default ReviewCarousel;

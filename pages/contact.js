import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Form submitted!');
  };

  return (
    <div className="bg-[#fdfff0] p-8 min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-8">Contact Us</h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-center mb-6">What Our Clients Say</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-2">"Excellent service! The team was very professional and addressed all our concerns promptly. Highly recommended!"</p>
            <p className="font-semibold">Jane Doe</p>
            <p className="text-sm text-gray-500">CEO, Example Corp</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-2">"I had a great experience with this company. The customer support was fantastic, and the product quality exceeded my expectations."</p>
            <p className="font-semibold">John Smith</p>
            <p className="text-sm text-gray-500">Marketing Director, Example Inc</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-2">"A reliable and trustworthy service provider. Their attention to detail and commitment to client satisfaction is unmatched."</p>
            <p className="font-semibold">Emily Johnson</p>
            <p className="text-sm text-gray-500">Freelancer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

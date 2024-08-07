// /pages/addbid.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddBid = () => {
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      setUploading(true);

      // Prepare form data for image upload
      const formData = new FormData();
      formData.append('file', image);

      try {
        // Upload the image
        const uploadResponse = await axios.post('/api/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setImageUrl(uploadResponse.data.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
        setUploading(false);
        return;
      }
    }

    // Proceed with adding the bid
    try {
      await axios.post('/api/addBid', { destination, from, to, weight, dimensions, imageUrl });
      alert('Bid added successfully!');
      router.push('/bids');
    } catch (error) {
      console.error('Error adding bid:', error);
      alert('Failed to add bid');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Bid</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <label className="block mb-2">
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="block w-full mt-1 border rounded-lg p-2"
            required
          />
        </label>
        <label className="block mb-2">
          From:
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="block w-full mt-1 border rounded-lg p-2"
            required
          />
        </label>
        <label className="block mb-2">
          To:
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="block w-full mt-1 border rounded-lg p-2"
            required
          />
        </label>
        <label className="block mb-2">
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="block w-full mt-1 border rounded-lg p-2"
            required
          />
        </label>
        <label className="block mb-2">
          Dimensions (cm):
          <input
            type="text"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
            className="block w-full mt-1 border rounded-lg p-2"
            required
          />
        </label>
        <label className="block mb-4">
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full mt-1 border rounded-lg p-2"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Add Bid'}
        </button>
      </form>
    </div>
  );
};

export default AddBid;

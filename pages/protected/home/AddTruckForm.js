import { useState } from 'react';

export default function AddTruckForm({ addTruck }) {
  const [formData, setFormData] = useState({
    operator: '',
    departure: '',
    duration: '',
    arrival: '',
    date: '',
    rating: '',
    price: '',
    seatsAvailable: '',
    singleSeats: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);

    const response = await fetch('/api/trucks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const newTruck = await response.json();
      addTruck(newTruck);
      setFormData({
        operator: '',
        departure: '',
        duration: '',
        arrival: '',
        date: '',
        rating: '',
        price: '',
        seatsAvailable: '',
        singleSeats: ''
      });
    } else {
      console.error('Failed to submit form data');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          name="operator"
          type="text"
          placeholder="Operator"
          value={formData.operator}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="departure"
          type="text"
          placeholder="Departure"
          value={formData.departure}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="duration"
          type="text"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="arrival"
          type="text"
          placeholder="Arrival"
          value={formData.arrival}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="date"
          type="text"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="seatsAvailable"
          type="number"
          placeholder="Seats Available"
          value={formData.seatsAvailable}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="singleSeats"
          type="number"
          placeholder="Single Seats"
          value={formData.singleSeats}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Truck</button>
    </form>
  );
}

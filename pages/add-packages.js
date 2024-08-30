import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddPackagesForm() {
  const [formData, setFormData] = useState({
    operator: '',
    departure: '',
    
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);

    const response = await fetch('/api/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      router.push('/packages');
    } else {
      console.error('Failed to submit form data');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Truck</h1>
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
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Package</button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddTruckForm() {
  const [formData, setFormData] = useState({
    PhoneNo: '',
    Name: ''
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);

    const response = await fetch('/api/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      router.push('/create-account');
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
            name="PhoneNo"
            type="text"
            placeholder="Operator"
            value={formData.PhoneNo}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="Name"
            type="text"
            placeholder="Departure"
            value={formData.Name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white mr-10 rounded">Add Truck</button>
        <button type="submit" className="p-2 bg-blue-500 ml-32 text-white rounded">Already Have an Account</button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateAccountForm() {
  const [formData, setFormData] = useState({
    PhoneNo: '',
    Name: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
      setSuccessMessage('Account created successfully!');
      setErrorMessage('');
      router.push('/create-account'); // Redirect after successful submission
    } else {
      const errorData = await response.json();
      setErrorMessage(`Failed to submit form data: ${errorData.message}`);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            name="PhoneNo"
            type="text"
            placeholder="PhoneNo"
            value={formData.PhoneNo}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="Name"
            type="text"
            placeholder="Name"
            value={formData.Name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white mr-10 rounded">
          Submit
        </button>
        <button type="button" className="p-2 bg-blue-500 text-white mr-10 rounded">
          Add Truck
        </button>
        <button type="button" className="p-2 bg-blue-500 ml-10 text-white rounded">
          Already Have an Account
        </button>
      </form>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

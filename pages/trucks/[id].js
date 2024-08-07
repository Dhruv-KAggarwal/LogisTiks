import { useState, useEffect } from 'react';
import TruckList from '../components/TruckList';
import AddTruckForm from '../components/AddTruckForm';

export default function Trucks() {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    fetch('/api/trucks')
      .then(response => response.json())
      .then(data => setTrucks(data));
  }, []);

  const addTruck = (newTruck) => {
    setTrucks([...trucks, newTruck]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Trucks</h1>
      <AddTruckForm addTruck={addTruck} />
      <TruckList trucks={trucks} />
    </div>
  );
}

import Link from 'next/link';

export default function TruckList({ trucks }) {
  return (
    <div>
      {trucks.map(truck => (
        <div key={truck._id} className="border p-4 mb-4">
          <h2 className="text-xl font-bold">{truck.operator}</h2>
          <p>Departure: {truck.departure}</p>
          <p>Duration: {truck.duration}</p>
          <p>Arrival: {truck.arrival}</p>
          <p>Date: {truck.date}</p>
          <p>Rating: {truck.rating}</p>
          <p>Price: {truck.price}</p>
          <p>Seats Available: {truck.seatsAvailable}</p>
          <p>Single Seats: {truck.singleSeats}</p>
          <Link href={`/trucks/${truck._id}`}>
            <a className="text-blue-500">View Details</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

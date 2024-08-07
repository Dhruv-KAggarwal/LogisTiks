import { MongoClient } from 'mongodb';

// Ensure you have a valid MongoDB URI in your environment variables
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(uri);

// Use a global variable to prevent multiple clients in development
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to avoid multiple clients
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client and connect
  clientPromise = client.connect();
}

export default clientPromise;

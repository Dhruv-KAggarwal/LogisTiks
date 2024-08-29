import { MongoClient } from 'mongodb';
import { getCookie, setCookie } from 'cookies-next';

// Simulated user credentials (in a real app, these would be checked against a database)
const testCredentials = {
  username: 'test',
  password: 'test',
  userId: '1111', // Static userId for the test user
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { operator, departure, duration, username, password, phone } = req.body;

  // Basic input validation
  if (!operator || !departure || !duration || (!username && !phone)) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate credentials and set userId
  let userId;
  if (username === testCredentials.username && password === testCredentials.password) {
    userId = testCredentials.userId; // Set userId to '1111' for the test user
  } else {
    userId = phone; // Use phone as userId for other users
  }

  try {
    // Set userId in cookies
    setCookie('userId', userId, { req, res, httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Check if the userId cookie is properly set
    const retrievedUserId = getCookie('userId', { req, res });
    if (!retrievedUserId) {
      console.error('Failed to set userId cookie');
      return res.status(401).json({ message: 'Unauthorized: No userId cookie found' });
    }
  } catch (cookieError) {
    console.error('Error setting or retrieving cookies:', cookieError);
    return res.status(500).json({ message: 'Failed to set cookies', error: cookieError.message });
  }

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set');
    return res.status(500).json({ message: 'Internal server error: Database configuration issue' });
  }

  let client;

  try {
    // Connect to MongoDB
    client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db('our-database-name');
    const result = await db.collection('bids').insertOne({
      userId,
      operator,
      departure,
      duration,
    });

    console.log('Insertion result:', result);

    res.status(201).json({ message: 'Bids added successfully', bidsId: result.insertedId });
  } catch (error) {
    console.error('Error while adding bids:', error);
    res.status(500).json({ message: 'Failed to add bids', error: error.message });
  } finally {
    if (client) {
      try {
        console.log('Closing MongoDB connection...');
        await client.close();
      } catch (closeError) {
        console.error('Error closing MongoDB connection:', closeError);
      }
    }
  }
}

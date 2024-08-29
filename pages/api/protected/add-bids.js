import { MongoClient } from 'mongodb';
import { getCookie, setCookie } from 'cookies-next';

// Simulated user credentials (in a real app, these would be checked against a database)
const testCredentials = {
  username: 'test',
  password: 'test',
  userId: '1111', // Static userId for the test user
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { operator, departure, duration, username, password, phone } = req.body;

    // Validate credentials and set userId
    let userId;

    // Check if username and password are "test" and "test"
    if (username === testCredentials.username && password === testCredentials.password) {
      userId = testCredentials.userId; // Set userId to '1111' for the test user
    } else {
      // For all other users, use phone as userId
      userId = phone;
    }

    // Set userId in cookies
    setCookie('userId', userId, { req, res, httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Check if the userId cookie is properly set
    const retrievedUserId = getCookie('userId', { req, res });

    if (!retrievedUserId) {
      console.error('Unauthorized: No userId cookie found');
      return res.status(401).json({ message: 'Unauthorized: No userId cookie found' });
    }

    let client;

    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not set');
      }

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
        console.log('Closing MongoDB connection...');
        await client.close();
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

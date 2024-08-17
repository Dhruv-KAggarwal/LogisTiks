import { MongoClient } from 'mongodb';
import { getCookie } from 'cookies-next';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { operator, departure, duration } = req.body;
    const userId = getCookie('userId', { req, res });

    if (!userId) {
      console.error('Unauthorized: No userId cookie found');
      return res.status(401).json({ message: 'Unauthorized: No userId cookie found' });
    }

    let client;

    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not set');
      }

      client = await MongoClient.connect(process.env.MONGODB_URI);

      const db = client.db('our-database-name');
      const result = await db.collection('trucks').insertOne({
        userId,
        operator,
        departure,
        duration,
      });

      console.log('Insertion result:', result);

      res.status(201).json({ message: 'Truck added successfully', truckId: result.insertedId });
    } catch (error) {
      console.error('Error while adding truck:', error);
      res.status(500).json({ message: 'Failed to add truck', error: error.message });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

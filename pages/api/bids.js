// pages/api/bids.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db('your-database-name');
    const bidsCollection = db.collection('bids');
    const bids = await bidsCollection.find({}).toArray();
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bids' });
  } finally {
    await client.close();
  }
}

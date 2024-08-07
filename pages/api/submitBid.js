// pages/api/submitBid.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { bidId, price } = req.body;
    try {
      await client.connect();
      const db = client.db('your-database-name');
      const bidsCollection = db.collection('bids');
      await bidsCollection.updateOne({ _id: new MongoClient.ObjectId(bidId) }, { $set: { price } });
      res.status(200).json({ message: 'Bid submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit bid' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

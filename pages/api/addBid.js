import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

const handler = nextConnect({
  onError: (err, req, res) => {
    res.status(500).json({ error: `Something went wrong! ${err.message}` });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  },
})
  .post(async (req, res) => {
    const { destination, from, to, weight, dimensions, imageUrl } = req.body;
    try {
      await client.connect();
      const db = client.db('your-database-name'); // Replace with your database name
      const collection = db.collection('bids');
      const result = await collection.insertOne({ destination, from, to, weight, dimensions, imageUrl });
      res.status(200).json({ message: 'Bid added successfully', result });
    } catch (error) {
      res.status(500).json({ error: `Failed to add bid: ${error.message}` });
    } finally {
      await client.close();
    }
  });

export default handler;

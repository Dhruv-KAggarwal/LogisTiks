import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('your-database-name');

  if (req.method === 'GET') {
    try {
      const packages = await db.collection('packages').find({}).toArray();
      res.status(200).json(packages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch packages' });
    }
  } else if (req.method === 'POST') {
    try {
      const newPackage = req.body;
      const result = await db.collection('packages').insertOne(newPackage);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add package' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb.js';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('your-database-name');

  const { id } = req.query;

  if (req.method === 'GET') {
    const truck = await db.collection('create-account').findOne({ _id: new ObjectId(id) });
    res.status(200).json(data);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
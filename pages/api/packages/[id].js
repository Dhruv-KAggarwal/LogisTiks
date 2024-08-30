import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb.js';
import Packages from '../../packages.js';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('your-database-name');

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Fetch a specific package using its ID
      const packages = await db.collection('packages').findOne({ _id: new ObjectId(id) });

      if (!packages) {
        // If no package is found, return a 404 error
        return res.status(404).json({ message: 'Package not found' });
      }

      // Respond with the found package
      res.status(200).json(packages);
    } catch (error) {
      // Handle errors such as invalid ObjectId format
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    // Respond with a 405 error for any non-GET requests
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

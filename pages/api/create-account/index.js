import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    console.log('Client:', client); // Add this line to debug

    if (typeof client.db !== 'function') {
      throw new Error('client.db is not a function');
    }

    const db = client.db('your-database-name'); // Ensure this is the correct database name

    if (req.method === 'GET') {
      try {
        const createaccount = await db.collection('create-account').find({}).toArray();
        res.status(200).json(createaccount);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Failed to retrieve trucks' });
      }
    } else if (req.method === 'POST') {
      const newAccount = req.body;
      console.log('Received new data:', newAccount);

      try {
        const result = await db.collection('create-account').insertOne(newAccount);
        console.log('Inserted account:', result.insertedId); // Use result.insertedId instead of result.ops[0]
        res.status(201).json({ _id: result.insertedId, ...newAccount });
      } catch (error) {
        console.error('Error inserting account:', error);
        res.status(500).json({ error: 'Failed to insert account' });
      }
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

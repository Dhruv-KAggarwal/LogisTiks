// /pages/api/files/[id].js
import { MongoClient, GridFSBucket } from 'mongodb';
import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });

const handler = nextConnect()
  .get(async (req, res) => {
    const { id } = req.query;

    try {
      await client.connect();
      const db = client.db('your-database-name');
      const bucket = new GridFSBucket(db, { bucketName: 'images' });

      bucket.openDownloadStream(new ObjectId(id))
        .pipe(res)
        .on('error', (err) => {
          res.status(500).json({ error: `Failed to retrieve image: ${err.message}` });
        });
    } catch (error) {
      res.status(500).json({ error: `Failed to retrieve image: ${error.message}` });
    } finally {
      await client.close();
    }
  });

export default handler;

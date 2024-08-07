// /pages/api/uploadImage.js
import { MongoClient, GridFSBucket } from 'mongodb';
import nextConnect from 'next-connect';
import multer from 'multer';
import stream from 'stream';

// Ensure MONGODB_URI is provided in environment variables
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI environment variable is required');
}

const client = new MongoClient(uri);

const upload = multer({ storage: multer.memoryStorage() });

const handler = nextConnect()
  .use(upload.single('file'))
  .post(async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      await client.connect();
      const db = client.db('your-database-name'); // Update this with your database name
      const bucket = new GridFSBucket(db, { bucketName: 'images' });

      const uploadStream = bucket.openUploadStream(file.originalname);
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      bufferStream.pipe(uploadStream)
        .on('error', (err) => {
          console.error('Error uploading file:', err);
          res.status(500).json({ error: `Failed to upload image: ${err.message}` });
        })
        .on('finish', () => {
          res.status(200).json({ imageUrl: `/api/files/${uploadStream.id}` });
        });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).json({ error: `Failed to upload image: ${error.message}` });
    } finally {
      await client.close();
    }
  });

export default handler;

// /pages/api/addBid.js
import nextConnect from 'next-connect';

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
    // Implement logic to save bid details to your database
    res.status(200).json({ message: 'Bid added successfully' });
  });

export default handler;

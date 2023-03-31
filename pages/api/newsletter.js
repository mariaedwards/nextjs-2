const Joi = require('joi');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const emailSchema = Joi.string().email().required();

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    const { error } = emailSchema.validate(userEmail);
    if (error) {
      return res.status(422).json({ error: error.details[0].message });
    }

    try {
      await client.connect();
      const collection = client.db('newsletter').collection('emails');
      await collection.insertOne({ email: userEmail });
      res.status(201).json(userEmail);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    } finally {
      await client.close();
    }
  }
}

export default handler;

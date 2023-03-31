const Joi = require('joi');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  text: Joi.string().required(),
  eventId: Joi.string().required(),
});

async function handler(req, res) {
  const eventId = req.query.eventId;
  if (req.method === 'GET') {
    try {
      await client.connect();
      const collection = client.db('newsletter').collection('comments');
      const result = await collection.find().sort({ _id: -1 }).toArray();
      console.log(result);
      res.status(200).json({ comments: result });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    } finally {
      await client.close();
    }
  }
  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    const comment = {
      email,
      name,
      text,
      eventId,
    };

    const { error } = schema.validate(comment);
    if (error) {
      return res.status(422).json({ error: error.details[0].message });
    }

    try {
      await client.connect();
      const collection = client.db('newsletter').collection('comments');
      const result = await collection.insertOne({ comment: comment });
      comment.id = result.insertedId;
      res.status(201).json(comment);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    } finally {
      await client.close();
    }
  }
}

export default handler;

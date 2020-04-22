import express from 'express';
import bodyParser from 'body-parser';
import "dotenv-defaults/config";
import mongoose from 'mongoose';
import { Poll } from './mongo/models';
import { MONGO_URL, PORT } from './constants';

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/polls', async (req, res) => {
  try {
    const { body: { name, type, creator, timelimit, created, ended } } = req;
    const poll = new Poll({ name, type, creator, timelimit, created, ended });

    await poll.save();
    res.status(200).send(`Poll Added: ${poll}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.listen(PORT, async () => {
  try {
    console.info(`App is Running at PORT: ${PORT}!`);
    await mongoose.connect(MONGO_URL ? MONGO_URL : '', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    console.info('MongoDb is connected!')

  } catch (error) {
    console.error('connection error:', error);
  }
})


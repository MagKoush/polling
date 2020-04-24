import express from 'express';
import bodyParser from 'body-parser';
import "dotenv-defaults/config";
import mongoose from 'mongoose';
import { MONGO_URL, PORT } from './constants';
import { Polls, Users, Votes, Questions } from './routes';

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/questions', Questions);
app.use('/polls', Polls);
app.use('/votes', Votes);
app.use('/users', Users);

app.get('/', (req, res) => res.send('Hello RamAsh! 🍻🍻'));

app.listen(PORT, async () => {
  try {
    console.info(`App is Running at PORT: ${PORT}!`);
    await mongoose.connect(MONGO_URL ? MONGO_URL : '', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
    const db = mongoose.connection;
    console.info('MongoDb is connected!')

  } catch (error) {
    console.error('connection error:', error);
  }
})


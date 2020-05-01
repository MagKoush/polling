import 'dotenv-defaults/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { MONGO_URL, PORT } from './constants';
import { Elections, Polls, Users, Votes } from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Routes
app.use('/elections', Elections);
app.use('/polls', Polls);
app.use('/votes', Votes);
app.use('/users', Users);

app.get('/', (_req, res) => res.send('Hello RamAsh! 🍻🍻'));

app.listen(PORT, async () => {
  try {
    console.info(`App is Running at PORT: ${PORT}!`);

    await mongoose.connect(MONGO_URL ? MONGO_URL : '', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.info('MongoDb is connected!');
  } catch (error) {
    console.error('connection error:', error);
  }
});

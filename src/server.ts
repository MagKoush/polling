import express from 'express';
import bodyParser from 'body-parser';
import "dotenv-defaults/config";
import mongoose from 'mongoose';
import { MONGO_URL, PORT } from './constants';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

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


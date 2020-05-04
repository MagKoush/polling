import 'dotenv-defaults/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { MONGO_URL, PASSPORT_SECRET, PORT } from './constants';
import { User } from './mongo';
import { Auth, Elections, Polls, Users, Votes } from './routes';

// initialize the Expree Application
const app = express();

// Cors
app.use(cors());

// BodyParser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Passport
app.use(session({ cookie: { secure: true }, resave: false, saveUninitialized: true, secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

/**
 * @implements
 * Authentication logic to verify if the user exists from
 * a given userID that is stored inside the JWT payload.
 * If does, attach the user instance to the express request.
 */
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: PASSPORT_SECRET,
    },
    async ({ _id }, done) => {
      const user = await User.findById(_id);
      return done(null, user);
    },
  ),
);

app.get('/', (req, res) => {
  res.send('Hello MagKoush! 🍻🍻');
});

// Express App + MongoDB + Express Routes Setup
app.listen(PORT, async () => {
  try {
    console.info(`App is Running at PORT: ${PORT}!`);

    await mongoose.connect(MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.info(`MongoDb is connected to ${MONGO_URL}!`);

    //Routes
    app.use('/auth', Auth);
    app.use('/elections', passport.authenticate('jwt', { session: false }), Elections);
    app.use('/polls', passport.authenticate('jwt', { session: false }), Polls);
    app.use('/votes', passport.authenticate('jwt', { session: false }), Votes);
    app.use('/users', passport.authenticate('jwt', { session: false }), Users);

    console.info('Routes are open!');
  } catch (error) {
    console.error('connection error:', error);
  }
});

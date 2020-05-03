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

const app = express();

// Cors
app.use(cors({ credentials: true }));

// BodyParser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Passport
app.use(session({ cookie: { secure: true }, resave: false, saveUninitialized: true, secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

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

//Routes
app.use('/auth', Auth);
app.use('/elections', passport.authenticate('jwt', { session: false }), Elections);
app.use('/polls', passport.authenticate('jwt', { session: false }), Polls);
app.use('/votes', passport.authenticate('jwt', { session: false }), Votes);
app.use('/users', passport.authenticate('jwt', { session: false }), Users);

app.get('/', (req, res) => {
  res.send('Hello MagKoush! 🍻🍻');
});

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

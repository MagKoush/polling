import express from 'express';

import { User } from '../mongo';

const router = express.Router();

/**
 * POST method to authorize
 *
 * @param {string}          path      - '/auth/login'
 * @param {async Function}  callback  - Asynchronous callback to authenticate
 *                                      the user and send the JWT to the client
 * @param {string}          username  - request body parameter
 * @param {string}          password  - request body parameter
 */
router.post('/login', async (req, res) => {
  try {
    const {
      body: { username, password },
    } = req;
    const [user] = await User.find({ username });
    const { status, payload } = await user.authenticate(password);

    res.status(status).send(payload);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

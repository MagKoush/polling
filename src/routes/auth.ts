import express from 'express';

import { User } from '../mongo';
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const {
      body: { username, password },
    } = req;
    const [user] = await User.find({ username });

    const { status, payload } = await user.authenticate(username, password);

    res.status(status).send(payload);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

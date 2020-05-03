import express from 'express';

import { User } from '../mongo';

const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const {
      body: { orgID, name, email, username, password, isAdmin, polls },
    } = req;

    const user = new User({
      email,
      isAdmin,
      name,
      orgID,
      password,
      polls,
      username,
    });

    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    let user = {};

    if (id === 'me') {
      user = req.user;
    } else {
      user = await User.findById(id);
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/emails/:email', async (req, res) => {
  try {
    const {
      params: { email },
    } = req;

    const user = await User.find({ email });

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {
      params: { id },
      body: { electionID },
    } = req;
    const user = await User.findById(id);

    user.addElection(electionID);

    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

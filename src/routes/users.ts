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

    const user = await User.findById(id);

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

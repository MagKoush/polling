import express from 'express';
import { User } from '../mongo';

const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const { body: { orgID, name, email, username, password, isAdmin, polls } } = req;

    const user = new User({ orgID, name, email, username, password, isAdmin, polls });
    await user.save();
    res.send(user);

  } catch ({ errmsg }) {
    res.status(400).send(errmsg);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { params: { id } } = req;

    const user = await User.findById(id);
    res.send(user);

  } catch ({ errmsg }) {
    res.status(400).send(errmsg);
  }
});

export default router;
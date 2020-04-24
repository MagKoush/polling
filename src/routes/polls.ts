import express from 'express';
import { Poll } from '../mongo';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { body: { title, creator, timelimit, created, ended } } = req;
    const poll = new Poll({ title, creator, timelimit, created, ended });

    await poll.save();

    res.status(200).send(poll);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { params: { id } } = req;

    const user = await Poll.findById(id);

    res.status(200).send(user);
  } catch (error) {
    console.log(error)
    res.status(400).send(error.errmsg);
  }
});


export default router;
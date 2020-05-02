import express from 'express';

import { Poll } from '../mongo';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      body: { text, choices, type },
    } = req;
    const options = choices.split(',');
    const poll = new Poll({ options, text, type });

    await poll.save();
    res.status(200).send(poll);
  } catch (error) {
    res.status(400).send(JSON.stringify(error));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const poll = await Poll.findById(id);

    res.status(200).send(poll);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

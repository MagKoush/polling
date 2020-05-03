import express from 'express';

import { Vote } from '../mongo';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      body: { electionID, polls },
      user: { _id },
    } = req;

    res.send(await Vote.submitVotes(electionID, _id, polls));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/elections/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const votes = await Vote.queryByElection(id);

    res.send(votes);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

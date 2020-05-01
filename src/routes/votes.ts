import express from 'express';

import { Election, Vote } from '../mongo';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      body: { electionID, userID, polls },
    } = req;

    const votes = polls.map(({ ID, result }: any) => {
      return new Vote({ electionID, pollID: ID, result: result.toLowerCase(), userID });
    });
    await Vote.collection.insertMany(votes);
    res.send(votes);
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

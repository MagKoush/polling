import express from 'express';

import { Election, Poll } from '../mongo';
import { model } from 'mongoose';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      body: { polls, title, creator, timelimit, created, ended },
    } = req;
    const election = new Election({ created, creator, ended, polls, timelimit, title });

    await election.save();

    res.status(200).send(election);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const election = await Election.findById(id);

    res.status(200).send(election);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id/polls', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const election = await Election.findById(id);
    const polls = await Poll.find({
      _id: {
        $in: election.polls,
      },
    });

    res.status(200).send(polls);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

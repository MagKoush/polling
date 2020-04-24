import express from 'express';
import { Vote } from '../mongo';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { body: { pollID, userID, questionID, result } } = req;

    const vote = new Vote({ pollID, userID, questionID, result });

    await vote.save();
    res.send(vote);

  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/polls/:id', async (req, res) => {
  try {
    const { params: { id } } = req;

    const votes = await Vote.find({ pollID: id });

    res.send(votes);

  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const { params: { id } } = req;

    const votes = await Vote.find({ userID: id });

    res.send(votes);

  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/questions/:id', async (req, res) => {
  try {
    const { params: { id } } = req;

    const votes = await Vote.find({ questionID: id });

    res.send(votes);

  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
import express from 'express';

import { Election, Poll } from '../mongo';

const router = express.Router();

/**
 * POST method to create an election
 *
 * @param {string}          path      - '/elections'
 * @param {async Function}  callback  - Asynchronous callback to create and store
 *                                    - an election with the given parameters
 * @param {string}          polls     - Request body parameter
 * @param {string}          title     - Request body parameter
 * @param {string}          creator   - Request body parameter
 * @param {string}          timelimit - Request body parameter
 * @param {string}          created   - Request body parameter
 * @param {string}          ended     - Request body parameter
 */
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

/**
 * GET method to retrieve an election
 *
 * @param {string}          path      - '/elections/:id'
 * @param {async Function}  callback  - Asynchronous callback to retrieve an election
 *                                    - from a given election ID
 * @param {string}          id        - Request url parameter
 */
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

/**
 * GET method to retrieve a set polls associated to an election
 *
 * @param {string}          path      - '/elections/:id/polls'
 * @param {async Function}  callback  - Asynchronous callback to retrieve
 *                                    - a set of polls from a given election ID
 * @param {string}          id        - Request url parameter
 */
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

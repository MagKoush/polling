import express from 'express';

import { Vote } from '../mongo';

const router = express.Router();

/**
 * POST method to create and store a vote
 *
 * @param {string}          path        - '/votes'
 * @param {async Function}  callback    - Asynchronous callback to create and store
 *                                      - a vote with the given parameters
 * @param {string}          electionID  - Request body parameter
 * @param {string}          polls       - Request body parameter
 * @param {string}          _id         - Request user property through authentication
 */
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

/**
 * GET method to query votes associated with an election
 *
 * @param {string}          path        - '/votes/elections/:id'
 * @param {async Function}  callback    - Asynchronous callback to create and store
 *                                      - a vote with the given parameters
 * @param {string}          id          - Request body parameter
 */
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

/**
 * GET method to query users associated with a given election
 *
 * @param {string}          path        - '/votes/elections/:id/users'
 * @param {async Function}  callback    - Asynchronous callback to create and store
 *                                      - a vote with the given parameters
 * @param {string}          id          - Request body parameter
 */
router.get('/elections/:id/users', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    res.send(await Vote.queryUsersByElection(id));
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

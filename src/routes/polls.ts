import express from 'express';

import { Poll } from '../mongo';

const router = express.Router();

/**
 * POST method to create and store a poll
 *
 * NOTE: options parameter must be separated with commas.
 *
 * @param {string}          path      - '/polls'
 * @param {async Function}  callback  - Asynchronous callback to create and store a poll
 * @param {string}          text      - Request body parameter
 * @param {string}          options   - Request body parameter
 * @param {string}          type      - Request body parameter
 */
router.post('/', async (req, res) => {
  try {
    const {
      body: { text, options, type },
    } = req;
    const poll = new Poll({ options, text, type });

    await poll.save();

    res.status(200).send(poll);
  } catch (error) {
    res.status(400).send(JSON.stringify(error));
  }
});

/**
 * GET method to retrieve a poll
 *
 * @param {string}          path      - '/polls/:id'
 * @param {async Function}  callback  - Asynchronous callback to retrieve a poll
 * @param {string}          id        - Request url parameter
 */
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

import express from 'express';
import { Types, Schema } from 'mongoose';

import { User } from '../mongo';

const router = express.Router();

/**
 * POST method to create a user
 *
 * @param {string}          path      - '/users'
 * @param {async Function}  callback  - Asynchronous callback to create and store
 *                                    - a user with the given parameters
 * @param {string}          orgID     - Request body parameter
 * @param {string}          name      - Request body parameter
 * @param {string}          email     - Request body parameter
 * @param {string}          username  - Request body parameter
 * @param {string}          password  - Request body parameter
 * @param {string}          isRunner  - Request body parameter
 * @param {string}          polls     - Request body parameter
 */
router.post('/', async (req, res) => {
  try {
    const {
      body: { orgID, name, email, username, password, isRunner, polls },
    } = req;

    const user = new User({
      email,
      isRunner,
      name,
      orgID,
      password,
      polls,
      username,
    });

    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * GET method to retrieve a user information from a given ID
 *
 * NOTE: `/users/me` will retrieve and send the token holder's information
 *
 * @param {string}          path      - '/users/:id'
 * @param {async Function}  callback  - Asynchronous callback to retrieve a user
 * @param {string}          id        - Request url parameter
 */
router.get('/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    let user = {};

    if (id === 'me') user = req.user;
    else user = await User.findById(id);

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * GET method to retrieve a user information from a given email
 *
 * @param {string}          path      - '/users/emails/:email'
 * @param {async Function}  callback  - Asynchronous callback to retrieve a user
 * @param {string}          email     - Request url parameter
 */
router.get('/emails/:email', async (req, res) => {
  try {
    const {
      params: { email },
    } = req;

    const user = await User.find({ email });

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * GET method to retrieve list of users associated with an election
 *
 * @param {string}          path           - '/elections/:id'
 * @param {async Function}  callback       - Asynchronous callback to retrieve a user
 * @param {string}          electionID     - Request url parameter
 */
router.get('/elections/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.find({ elections: new Types.ObjectId(id) });

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * PUT method to append elections to the user
 *
 * @param {string}          path      - '/users/:id'
 * @param {async Function}  callback  - Asynchronous callback to append an election
 * @param {string}          id     - Request url parameter
 */
router.put('/:id', async (req, res) => {
  try {
    const {
      params: { id },
      body: { electionID },
    } = req;
    const user = await User.findById(id);

    user.addElection(electionID);

    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

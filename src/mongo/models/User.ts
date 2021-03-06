import jwt from 'jsonwebtoken';
import { Document, Model, model, Schema, Types } from 'mongoose';

import { PASSPORT_SECRET } from '../../constants';

/**
 * @private
 *
 * User Mongoose base schema to define the collection stored in MongoDb.
 *
 * @todo: hash password
 *
 * @property {Array<ObjectID>}  elections   - Array of elections associated to the user
 * @property {string}           email       - User's email
 * @property {boolean}          isRunner    - Is user an election runner
 * @property {string}           name        - User's name
 * @property {string}           orgID       - User's orgID
 * @property {string}           password    - User's Password
 * @property {string}           username    - User's Username
 */
const UserSchema = new Schema({
  elections: [{ default: [], ref: 'Election', type: Schema.Types.ObjectId }],
  email: {
    index: { unique: true },
    required: true,
    type: String,
    unique: true,
  },
  name: { index: { unique: true }, required: true, type: String, unique: true },
  orgID: { default: '12345', type: String },
  password: String,
  status: { default: 'voter', enum: ['admin', 'voter', 'runner'], type: String },
  username: {
    index: { unique: true },
    required: true,
    type: String,
    unique: true,
  },
});

/**
 * Add election ID from the elections array.
 *
 * @param {string} electionID - election to the given user's elections array
 */
UserSchema.methods.addElection = function (electionID: string): void {
  this.elections.push(electionID);
};

/**
 * Remove election ID from the polls array.
 *
 * @param {string} electionID - election to the given user's elections array
 */
UserSchema.methods.removeElection = function (electionID: string): void {
  const index = this.elections.indexOf(electionID);

  if (index > -1) {
    this.elections.splice(index, 1);
  }
};

/**
 * Authenticate user to match if the username matches with the password.
 *
 * @param {string} password inputted password to compared with the original password stored
 * @returns {Promise<Object>} response object to send to the client
 */
UserSchema.methods.authenticate = async function (password: string): Promise<any> {
  let response = {
    payload: {},
    status: 200,
  };

  // Does user exist
  if (!this) {
    response = {
      payload: { errMsg: 'User does not exist!' },
      status: 404,
    };
  } else if (password !== this.password) {
    response = {
      payload: { errMsg: 'Password does not match!' },
      status: 400,
    };
  } else {
    // Generate the token with a given secret
    const token = await jwt.sign({ _id: this._id }, PASSPORT_SECRET);
    response.payload = { token };
  }

  return response;
};

/**
 * @public
 *
 * @interface User interface
 *
 * @remarks interface needs to be exported to declare express request user types
 *
 * @todo: hash password
 *
 * @property {Array<ObjectID>}  elections      - Array of elections associated to the user
 * @property {string}           email          - User's email
 * @property {string}           status         - User's status
 * @property {string}           name           - User's name
 * @property {string}           orgID          - User's orgID
 * @property {string}           username       - User's Username
 * @property {string}           password       - User's Password
 * @property {Function}         addElection    - add electionID to the elections array
 * @property {Function}         removeElection - remove electionID from the elections array
 * @property {Function}         authenticate   - authenticate the user
 */
export interface User extends Document {
  elections: Array<Types.ObjectId>;
  email: string;
  status: String;
  name: string;
  orgID: string;
  username: string;
  password: string;
  addElection(electionID: string): void;
  removeElection(electionID: string): void;
  authenticate(password: string): Promise<any>;
}

/**
 * @private
 *
 * User Model value extended from the User interface
 */
type UserModel = Model<User>;

export default model<User, UserModel>('User', UserSchema);

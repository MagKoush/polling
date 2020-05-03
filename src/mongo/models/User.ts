import jwt from 'jsonwebtoken';
import { Document, Model, model, Schema } from 'mongoose';

import { PASSPORT_SECRET } from '../../constants';

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  elections: [{ default: [], ref: 'Election', type: Schema.Types.ObjectId }],
  email: {
    index: { unique: true },
    required: true,
    type: String,
    unique: true,
  },
  isAdmin: { default: false, type: Boolean },
  name: { index: { unique: true }, required: true, type: String, unique: true },
  orgID: { default: '12345', type: String },
  password: String,
  username: {
    index: { unique: true },
    required: true,
    type: String,
    unique: true,
  },
});

UserSchema.methods.addElection = function (electionID: string): void {
  this.elections.push(electionID);
};

UserSchema.methods.removeElection = function (electionID: string): void {
  const index = this.elections.indexOf(electionID);

  if (index > -1) {
    this.elections.splice(index, 1);
  }
};
UserSchema.methods.authenticate = async function (password: string): Promise<any> {
  let response = {
    payload: {},
    status: 200,
  };

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
    const token = await jwt.sign({ _id: this._id }, PASSPORT_SECRET);
    response.payload = { token };
  }

  return response;
};

interface User extends Document {
  _id: string;
  username: string;
  password: string;
  addElection(electionID: string): void;
  removeElection(electionID: string): void;
  authenticate(username: string, password: string): Promise<any>;
}

type UserModel = Model<User>;

export default model<User, UserModel>('User', UserSchema);

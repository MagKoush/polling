import { Document, Model, model, Schema } from 'mongoose';

const UserSchema = new Schema({
  ID: Schema.Types.ObjectId,
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

export interface User extends Document {
  addElection(electionID: string): void;
  removeElection(electionID: string): void;
}

export type UserModel = Model<User>;

export default model<User, UserModel>('User', UserSchema);

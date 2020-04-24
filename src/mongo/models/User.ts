import { model, Schema } from 'mongoose';
import { Polls } from '../../routes';

const UserSchema = new Schema({
  ID: Schema.Types.ObjectId,
  orgID: { type: String, default: '12345' },
  name: { type: String, unique: true, required: true, index: { unique: true } },
  email: { type: String, unique: true, required: true, index: { unique: true } },
  username: { type: String, unique: true, required: true, index: { unique: true } },
  password: String,
  isAdmin: { type: Boolean, default: false },
  open_polls: [{ type: Schema.Types.ObjectId, default: [], ref: 'Poll' }],
  submitted_polls: [{ type: Schema.Types.ObjectId, default: [], ref: 'Poll' }]
})

UserSchema.methods.addPoll = function (pollID: string) {
  this.polls.push(pollID);
}

UserSchema.methods.removePoll = function (pollID: string) {
  const index = this.polls.indexOf(pollID);

  if (index > -1) {
    this.polls.splice(index, 1);
  }
}

export default model('User', UserSchema);

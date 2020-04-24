import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  ID: Schema.Types.ObjectId,
  email: {
    index: { unique: true },
    required: true,
    type: String,
    unique: true,
  },
  isAdmin: { default: false, type: Boolean },
  name: { index: { unique: true }, required: true, type: String, unique: true },
  openPolls: [{ default: [], ref: "Poll", type: Schema.Types.ObjectId }],
  orgID: { default: "12345", type: String },
  password: String,
  submittedPolls: [{ default: [], ref: "Poll", type: Schema.Types.ObjectId }],
  username: {
    index: { unique: true },
    required: true,
    type: String,
    unique: true,
  },
});

UserSchema.methods.addPoll = function (pollID: string): void {
  this.polls.push(pollID);
};

UserSchema.methods.removePoll = function (pollID: string): void {
  const index = this.polls.indexOf(pollID);

  if (index > -1) {
    this.polls.splice(index, 1);
  }
};

export default model("User", UserSchema);

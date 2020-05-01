import { Document, Model, model, Schema } from 'mongoose';

const ElectionSchema = new Schema({
  ID: Schema.Types.ObjectId,
  created: Date,
  creator: String,
  ended: Date,
  polls: [{ default: [], ref: 'poll', type: Schema.Types.ObjectId }],
  timeLimit: Number,
  title: String,
});

ElectionSchema.methods.addpoll = function (electionID: string): void {
  this.polls.push(electionID);
};

ElectionSchema.methods.removepoll = function (electionID: string): void {
  const index = this.polls.indexOf(electionID);

  if (index > -1) {
    this.elections.splice(index, 1);
  }
};

interface Election extends Document {
  ID: Schema.Types.ObjectId;
  created: Date;
  creator: string;
  ended: Date;
  polls: Array<Schema.Types.ObjectId>;
  timelimit: number;
  addpoll(pollID: string): void;
  removepoll(pollID: string): void;
}

type ElectionModel = Model<Election>;

export default model<Election, ElectionModel>('Election', ElectionSchema);

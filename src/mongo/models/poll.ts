import { model, Schema } from 'mongoose';

const PollSchema = new Schema({
  ID: Schema.Types.ObjectId,
  created: Date,
  creator: String,
  ended: Date,
  questions: [{ default: [], ref: 'Question', type: Schema.Types.ObjectId }],
  timeLimit: Number,
  title: String,
});

PollSchema.methods.addQuestion = function (pollID: string): void {
  this.questions.push(pollID);
};

PollSchema.methods.removeQuestion = function (pollID: string): void {
  const index = this.questions.indexOf(pollID);

  if (index > -1) {
    this.polls.splice(index, 1);
  }
};

export default model('Poll', PollSchema);

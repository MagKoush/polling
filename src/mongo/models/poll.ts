import { model, Schema } from 'mongoose';

const PollSchema = new Schema({
  ID: Schema.Types.ObjectId,
  title: String,
  creator: String,
  timeLimit: Number,
  created: Date,
  ended: Date,
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question', default: [] }]
})

PollSchema.methods.addQuestion = function (pollID: string) {
  this.questions.push(pollID);
}

PollSchema.methods.removeQuestion = function (pollID: string) {
  const index = this.questions.indexOf(pollID);

  if (index > -1) {
    this.polls.splice(index, 1);
  }
}

export default model('Poll', PollSchema);

import { model, Schema } from 'mongoose';

const VoteSchema = new Schema({
  ID: Schema.Types.ObjectId,
  pollID: { type: Schema.Types.ObjectId, ref: 'Poll', required: true, },
  questionID: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  result: Schema.Types.Mixed,
})

// Enforce an uniqueness over three fields
VoteSchema.index({
  pollID: 1,
  questionID: 1,
  userID: 1
}, {
  unique: true
});

export default model('Vote', VoteSchema);

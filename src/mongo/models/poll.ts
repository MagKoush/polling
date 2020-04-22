import { ObjectId, Schema, model } from 'mongoose';

const PollSchema = new Schema({
  id: ObjectId,
  type: String,
  creator: String,
  timeLimit: Number,
  created: Date,
  ended: Date,
})

export default model('Poll', PollSchema);

import { model, Schema, Types } from 'mongoose';

const PollSchema = new Schema({
  id: Types.ObjectId,
  name: String,
  type: String,
  creator: String,
  timeLimit: Number,
  created: Date,
  ended: Date,
})

export default model('Poll', PollSchema);

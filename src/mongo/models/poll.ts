import { Document, Model, model, Schema } from 'mongoose';

const PollSchema = new Schema({
  ID: Schema.Types.ObjectId,
  options: [Schema.Types.Mixed],
  text: String,
});

type Poll = Document;
type PollModel = Model<Poll>;

export default model<Poll, PollModel>('Poll', PollSchema);

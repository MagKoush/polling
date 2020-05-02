import { Document, Model, model, Schema } from 'mongoose';

enum pollTypes {
  MS = 'multipleSelection',
  SS = 'singleSelection',
}

const PollSchema = new Schema({
  ID: Schema.Types.ObjectId,
  options: [Schema.Types.Mixed],
  text: String,
  type: { default: pollTypes.MS, required: true, type: pollTypes },
});

type Poll = Document;
type PollModel = Model<Poll>;

export default model<Poll, PollModel>('Poll', PollSchema);

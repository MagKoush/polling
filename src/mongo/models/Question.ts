import { model, Schema } from 'mongoose';

const QuestionSchema = new Schema({
  ID: Schema.Types.ObjectId,
  options: [Schema.Types.Mixed],
  text: String,
});

export default model('Question', QuestionSchema);

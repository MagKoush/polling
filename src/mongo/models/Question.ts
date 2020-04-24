import { model, Schema } from 'mongoose';

const QuestionSchema = new Schema({
  ID: Schema.Types.ObjectId,
  text: String,
  options: [Schema.Types.Mixed]
})

export default model('Question', QuestionSchema);

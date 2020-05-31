import { Document, Model, model, Schema } from 'mongoose';

/**
 * @private
 *
 * Poll Mongoose base schema to define the collection stored in MongoDb.
 *
 * @todo: Create an Enum for poll Type
 *
 * @property {Array<Mixed>}     options   - Array of options
 * @property {string}           text      - Poll text
 * @property {string}           type      - Poll Type
 */
const PollSchema = new Schema({
  options: [Schema.Types.Mixed],
  text: String,
  type: { default: 'multipleSelection', required: true, type: String },
});

/**
 * @private
 *
 * @interface Poll Interface.
 *
 * @todo: Create an Enum for poll Type
 *
 * @property {Array<Mixed>}     options   - Array of options
 * @property {string}           text      - Poll text
 * @property {string}           type      - Poll Type
 */
interface Poll extends Document {
  options: Array<Schema.Types.Mixed>;
  text: string;
  type: string;
}

/**
 * @private
 *
 * Poll Model value extended from the Poll interface
 */
type PollModel = Model<Poll>;

export default model<Poll, PollModel>('Poll', PollSchema);

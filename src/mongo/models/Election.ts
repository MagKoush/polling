import { Document, Model, model, Schema } from 'mongoose';

/**
 * @private
 *
 * Election Mongoose base schema to define the collection stored in MongoDb.
 *
 * @property {Date}             start     - Start Date
 * @property {string}           creator   - Creator's name
 * @property {Date}             end       - End Date
 * @property {Array<ObjectId>}  polls     - Array of poll's objectID associated to an election
 * @property {Number}           timelimit - Time limit in milliseconds
 * @property {string}           title     - Election's title
 */
const ElectionSchema = new Schema({
  creator: String,
  end: Date,
  polls: [{ default: [], ref: 'poll', type: Schema.Types.ObjectId }],
  start: Date,
  timeLimit: Number,
  title: String,
});

/**
 * Append poll ID to the polls array.
 *
 * @param {string} pollID - append poll to the given election polls array
 */
ElectionSchema.methods.addPoll = function (pollID: string): void {
  this.polls.push(pollID);
};

/**
 * Remove poll ID from the polls array.
 *
 * @param {string} pollID - poll to the given election polls array
 */
ElectionSchema.methods.removePoll = function (pollID: string): void {
  const index = this.polls.indexOf(pollID);

  if (index > -1) {
    this.elections.splice(index, 1);
  }
};

/**
 * @private
 *
 * @interface Election interface.
 *
 * @property {Date}             created    - Creation Date
 * @property {string}           creator    - Creator's name
 * @property {Date}             ended      - Expiration time
 * @property {Array<ObjectId>}  polls      - Array of poll's objectID associated to an election
 * @property {Number}           timelimit  - Time limit in milliseconds
 * @property {string}           title      - Election's title
 * @property {Function}         addPoll    - add poll ID to the polls
 * @property {Function}         removePoll - remove poll ID from the polls
 */
interface Election extends Document {
  created: Date;
  creator: string;
  ended: Date;
  polls: Array<Schema.Types.ObjectId>;
  timelimit: number;
  title: string;
  addPoll(pollID: string): void;
  removePoll(pollID: string): void;
}

/**
 * @private
 *
 * Election Model value extended from the Election interface
 */
type ElectionModel = Model<Election>;

export default model<Election, ElectionModel>('Election', ElectionSchema);

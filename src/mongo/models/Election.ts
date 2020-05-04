import { Document, Model, model, Schema } from 'mongoose';

/**
 * @private
 *
 * Election Mongoose base schema to define the collection stored in MongoDb.
 *
 * @property {ObjectId}         _id       - Unique ObjectID
 * @property {Date}             created   - Creation Date
 * @property {string}           creator   - Cretor's name
 * @property {Date}             ended     - Expiration time
 * @property {Array<ObjectId>}  polls     - Array of poll's objectID associted to an election
 * @property {Number}           timelimit - Time limit in milliseconds
 * @property {string}           title     - Election's title
 */
const ElectionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  created: Date,
  creator: String,
  ended: Date,
  polls: [{ default: [], ref: 'poll', type: Schema.Types.ObjectId }],
  timeLimit: Number,
  title: String,
});

/**
 * Append poll ID to the polls array.
 *
 * @param {string} pollID - append poll to the given election polls array
 */
ElectionSchema.methods.addpoll = function (pollID: string): void {
  this.polls.push(pollID);
};

/**
 * Remove poll ID from the polls array.
 *
 * @param {string} pollID - poll to the given election polls array
 */
ElectionSchema.methods.removepoll = function (pollID: string): void {
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
 * @property {ObjectId}         _id        - Unique ObjectID
 * @property {Date}             created    - Creation Date
 * @property {string}           creator    - Cretor's name
 * @property {Date}             ended      - Expiration time
 * @property {Array<ObjectId>}  polls      - Array of poll's objectID associted to an election
 * @property {Number}           timelimit  - Time limit in milliseconds
 * @property {string}           title      - Election's title
 * @property {Function}         addpoll    - add poll ID to the polls
 * @property {Function}         removepoll - remove poll ID from the polls
 */
interface Election extends Document {
  _id: Schema.Types.ObjectId;
  created: Date;
  creator: string;
  ended: Date;
  polls: Array<Schema.Types.ObjectId>;
  timelimit: number;
  title: string;
  addpoll(pollID: string): void;
  removepoll(pollID: string): void;
}

/**
 * @private
 *
 * Election Model value extended from the Election interface
 */
type ElectionModel = Model<Election>;

export default model<Election, ElectionModel>('Election', ElectionSchema);

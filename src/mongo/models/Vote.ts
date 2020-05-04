import { Document, Model, model, Schema, Types } from 'mongoose';

/**
 * @private
 *
 * Vote Mongoose base schema to define the collection stored in MongoDb.
 *
 * @property {ObjectId}  _id         - Unique ObjectID
 * @property {ObjectId}  electionID  - Array of elections associated to the user
 * @property {ObjectId}  pollID      - Array of elections associated to the user
 * @property {Mixed}     result      - inputted vote
 * @property {ObjectId}  userID      - Array of elections associated to the user
 */
const VoteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  electionID: { ref: 'Election', required: true, type: Schema.Types.ObjectId },
  pollID: { ref: 'Poll', required: true, type: Schema.Types.ObjectId },
  result: Schema.Types.Mixed,
  userID: { ref: 'User', required: true, type: Schema.Types.ObjectId },
});

// todo: uncomment this out for prod or automate this process

// Enforce an uniqueness over three fields
// VoteSchema.index(
//   {
//     electionID: 1,
//     pollID: 1,
//     userID: 1,
//   },
//   {
//     unique: true,
//   },
// );

/**
 * store the votes
 *
 * @param  {string} electionID - Electoin ID associated to the vote
 * @param  {string} userID     - User ID associated to the vote
 * @param  {Array<any>} polls  - Polls associted to the vote
 * @returns {Promise<Array<VoteModel>>} a promise to array of submitted votes
 */
VoteSchema.statics.submitVotes = async function (
  electionID: string,
  userID: string,
  polls: Array<any>,
): Promise<Array<VoteModel>> {
  const votes = [];

  for (const { _id, results } of polls) {
    // multipleSelection vote
    if (Array.isArray(results)) {
      for (const result of results) {
        votes.push(
          new this({
            electionID,
            pollID: _id,
            result: result.toLowerCase(),
            userID,
          }),
        );
      }
    } else {
      //singleSelection vote
      votes.push(
        new this({
          electionID,
          pollID: _id,
          result: results.toLowerCase(),
          userID,
        }),
      );
    }
  }

  await this.collection.insertMany(votes);

  return votes;
};

/**
 * return set of votes mapped to a give electionID
 *
 * @param  {string} electionID - Election's ID to query the votes from
 * @returns {Array<VoteModel>} an array of votes
 */
VoteSchema.statics.queryByElection = function (electionID: string): Array<VoteModel> {
  return this.aggregate([
    {
      $match: {
        electionID: new Types.ObjectId(electionID),
      },
    },
    {
      $group: {
        _id: {
          pollID: '$pollID',
          vote: '$result',
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: '$_id.pollID',
        results: {
          $push: {
            option: '$_id.vote',
            vote: '$count',
          },
        },
      },
    },
  ]);
};

/**
 * @private
 *
 * @interface Vote Interface
 *
 * @property {ObjectId}  _id         - Unique ObjectID
 * @property {ObjectId}  electionID  - Array of elections associated to the user
 * @property {ObjectId}  pollID      - Array of elections associated to the user
 * @property {Mixed}     result      - inputted vote
 * @property {ObjectId}  userID      - Array of elections associated to the user
 */
interface Vote extends Document {
  _id: Schema.Types.ObjectId;
  electionID: Schema.Types.ObjectId;
  pollID: Schema.Types.ObjectId;
  result: Schema.Types.Mixed;
  userID: Schema.Types.ObjectId;
}

/**
 * @private
 *
 * Vote Model value extended from the Vote interface
 *
 * @property {Function} queryByElection - static method to query voted from a given election ID
 * @property {Function} submitVotes     - static method to store the votes
 */
interface VoteModel extends Model<Vote> {
  queryByElection(electionID: string): Function;
  submitVotes(electionID: string, userID: string, polls: Array<any>): Function;
}

export default model<Vote, VoteModel>('Vote', VoteSchema);

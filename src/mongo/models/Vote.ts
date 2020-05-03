import { Document, Model, model, Schema, Types } from 'mongoose';

const VoteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  electionID: { ref: 'Election', required: true, type: Schema.Types.ObjectId },
  pollID: { ref: 'Poll', required: true, type: Schema.Types.ObjectId },
  result: Schema.Types.Mixed,
  userID: { ref: 'User', required: true, type: Schema.Types.ObjectId },
});

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

  this.collection.insertMany(votes).catch((e: any) => console.log(e));

  return votes;
};

VoteSchema.statics.queryByElection = function (electionID: string): any {
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

interface Vote extends Document {
  _id: Schema.Types.ObjectId;
  electionID: Schema.Types.ObjectId;
  pollID: Schema.Types.ObjectId;
  userID: Schema.Types.ObjectId;
}

interface VoteModel extends Model<Vote> {
  queryByElection(electionID: string): Function;
  submitVotes(electionID: string, userID: string, polls: Array<any>): Function;
}

export default model<Vote, VoteModel>('Vote', VoteSchema);

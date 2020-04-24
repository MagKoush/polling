import { model, Schema } from "mongoose";

const VoteSchema = new Schema({
  ID: Schema.Types.ObjectId,
  pollID: { ref: "Poll", required: true, type: Schema.Types.ObjectId },
  questionID: { ref: "Question", required: true, type: Schema.Types.ObjectId },
  result: Schema.Types.Mixed,
  userID: { ref: "User", required: true, type: Schema.Types.ObjectId },
});

// Enforce an uniqueness over three fields
VoteSchema.index(
  {
    pollID: 1,
    questionID: 1,
    userID: 1,
  },
  {
    unique: true,
  }
);

export default model("Vote", VoteSchema);

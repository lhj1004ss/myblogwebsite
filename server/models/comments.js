import mongoose from "mongoose";
import moment from "moment";

const CommentSchema = new mongoose.Schema({
  // comment
  contents: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format("MM-DD-YYYY hh:mm:ss"),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  creatorName: { type: String },
});

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;

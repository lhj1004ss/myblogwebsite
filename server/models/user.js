import mongoose from "mongoose";
import moment from "moment";
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Owner", "Manager", "User"],
    default: "Owner",
  },
  register_date: {
    type: Date,
    default: moment().format("MM-DD-YYYY hh:mm:ss"),
  },
  comments: [
    {
      post_id: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
    },
    {
      comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    },
  ],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
});

const User = mongoose.model("user", UserSchema);

export default User;

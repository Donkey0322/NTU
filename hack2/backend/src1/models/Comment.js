// 建立 DB-Model
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const NewSchema = new Schema(
  {
    // name: String,
    // subject: String,
    // score: String,
  },
  { collection: "Comment" }
);

const Comment = mongoose.model("Comment", NewSchema);

export default Comment;

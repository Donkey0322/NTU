// 建立 DB-Model
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  subject: String,
  score: String,
});

const ScoreCard = mongoose.model("ScoreCard", UserSchema);

export default ScoreCard;

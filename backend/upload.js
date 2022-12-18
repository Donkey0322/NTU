import { QuestionModel } from "./models/gamebox";
import QuestionData from "./data.json";

const dataInit = async () => {
  const checkData = await QuestionModel.find();
  console.log(checkData.length);
  await QuestionModel.deleteMany({});
  await QuestionModel.insertMany(QuestionData);
};

export { dataInit };

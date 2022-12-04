import {QuestionModel} from './models/gamebox'
import QuestionData from './data.json'

const dataInit = async () => {
    const checkData = await QuestionModel.find()
    console.log(checkData.length);
    if (checkData.length !== 20) {
      console.log("Total questions are not equal to default ", checkData.length)
      await QuestionModel.deleteMany({})
      await QuestionModel.insertMany(QuestionData)
    }
    else{
      console.log("The number of questions is correct", checkData.length)
    }
}
  

export { dataInit }
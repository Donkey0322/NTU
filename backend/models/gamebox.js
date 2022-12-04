import mongoose from 'mongoose';

const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    id: {type: Number},
    img: { type: String},
    answer: [{ type: String }]
})
const QuestionModel = mongoose.model('question', QuestionSchema)

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    }, waiting: {
        type: Boolean
    }, group: {
        type: String
    }
})
const PlayerModel = mongoose.model('player', PlayerSchema)

export {QuestionModel, PlayerModel};


const mongoose = require("mongoose")
const Schema = mongoose.Schema

const QuestionsSchema = new Schema({
    question: {type: String, required: true},
    answer: {type: String},
    topic: {type: String, required: true},
    url: {type: String, required: true},
    tags: {type: Array},
    author:{type: String},
    comment:{type: String}
})

module.exports = mongoose.model("question", QuestionsSchema)

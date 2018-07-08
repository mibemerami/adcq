const mongoose = require("mongoose")
const Schema = mongoose.Schema

const QuestionsSchema = new schema({
    question: {type: String, required: true},
    answer: {type: String},
    topic: {type: String, required: true},
    url: {type: String, required: true},
    tags: {type: Array},
    points:{type: Number}
})

module.exports = mongoose.model("question", QuestionsSchema)

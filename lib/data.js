const mongoose = require("mongoose")
const Question = require("../db_models/Questions")

data = {}
data.getDocuURLs = (options) => {
    return Question.find({}, "url").sort()
        .then((searchResult => {
            console.log(searchResult)
            return searchResult  // TODO: Filter dublicate URLs
        }))
}

data.getQuestionByID = (id) => {
    console.log("data.getQuestion()");
    console.log(id);
    
    return Question.findById(id)
}

data.getAllQuestionsForTest = (url) => {
    console.log("data.getAllQuestion()");
    console.log(url);
    
    return Question.find({url: url},).sort()
} 


module.exports = data

const mongoose = require("mongoose")
const Question = require("../db_models/Questions")

data = {}
data.getQuestionCategories = (options) => {
    return Question.find({}, "url topic").sort()
        .then((searchResult => {
            return searchResult  
        }))
}

data.getQuestionByID = (id) => {
    console.log("data.getQuestion()");
    console.log(id);
    
    return Question.findById(id)
}

data.getAllQuestionsForTest = (url) => {
    console.log("data.getAllQuestion()")
    console.log(url);
    
    return Question.find({url: url},).sort()
} 

data.addQuestion = (questionToAdd) => {
    console.log("The question to add is:")
    console.log(questionToAdd);
    let qta = new Question(questionToAdd)
    return qta.save()
}


module.exports = data

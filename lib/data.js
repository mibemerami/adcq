const mongoose = require("mongoose")
const Question = require("../db_models/Questions")
const User = require("../db_models/User")

data = {}
data.getQuestionCategories = (options) => {
    return Question.find({}, "url topic").sort()
        .then((searchResult => {
            return searchResult  
        }))
        .catch(err => console.log("Error getting questions from DB: ", err))
}

data.getQuestionByID = (id) => {
    console.log("data.getQuestionById()");
    console.log(id);
    
    return Question.findById(id).catch(err => console.log("Error getting question from DB: ", err))
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

data.getAllUsers = () => {
    return User.find({}).sort()
}


module.exports = data

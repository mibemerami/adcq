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
    return qta.save((err, qta) => {
        console.log("addQuestion err: ", err);
        console.log("addQuestion qta", qta);

        if (err) {
            console.log("A problem occurred, while trying to save the new question:")
            console.log(qta)
            console.log(err)
        } else {
            console.log("The new question has been add successfully to the database.");
            console.log(qta)
        }
    })
}


module.exports = data



helpers = {}

helpers.runQuestions = (questions, res) => {
    console.log("helpers.runQuestions()");
    console.log(questions);
    
    questions.forEach(question => {
        console.log(question);
        
    })
    res.render("show_question", {questions: questions})
}

module.exports = helpers

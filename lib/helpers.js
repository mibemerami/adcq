

helpers = {}

helpers.runQuestions = (questions, res) => {
    console.log("helpers.runQuestions()");
    console.log(questions);
    
    questions.forEach(question => {
        console.log(question);
        
    })
    res.render("show_question")
}
/*
helpers.runQuestions = function* (questions, res) {
    console.log("helpers.runQuestions()");
    console.log(questions);
    
    questions.forEach(question => {
        console.log(question);
        yield res.render("show_question")   // TODO
        yield res.render("show_question_with_answer")   // TODO
    })
    res.redirect("/")
}
*/
module.exports = helpers

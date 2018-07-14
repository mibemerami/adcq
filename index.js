const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const data = require("./lib/data")
const helpers = require("./lib/helpers")

// Connect to MongoDB
mongoose.Promise = global.Promise  // Mongoose Promise is depricated
mongoose.connect("mongodb://localhost:27017/adcq")
    .then(() => {
        console.log(
            "Cennection to Mongo DB successfull."
        );
    })
    .catch((err) => console.log(err))


// Initialize server
let app = express()

// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add and configure template-engine
let hbs = exphbs.create({
    defaultLayout: "main",
    helpers: {
        supplyQuestions: function () {
            return JSON.stringify(this.questions).replace(/\n|\r/g, '')
        }
    }
})
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

// Define routes
app.get("/", (req, res) => {
    data.getQuestionCategories()
        .then((result) => {
            let normalizedResult = helpers.normalizeQueryResultForStartPage(result)
            res.render("home", { questions: normalizedResult })
        })
        .catch(err => console.log(err))
})

app.get("/questions-run", (req, res) => {
    data.getQuestionByID({ _id: req.query.id })
        .then(question => data.getAllQuestionsForTest(question.url))
        .then(questions => {
            helpers.runQuestions(questions, res)
        })
        .catch(err => console.log(err))
})

app.get("/add_question", (req, res) => {
    res.render("add_question")
})

app.post("/add_question", (req, res) => {
    let questionToAdd = {
        question: req.body.questionText.trim(),
        answer: req.body.answer.trim(),
        topic: req.body.topic.trim(),
        url: req.body.URL.trim(),
        tags: req.body.tags.split(",").map(tag => tag.trim().toLowerCase()),
        author: req.body.author.trim(),
        comment: req.body.comment
    }
    data.addQuestion(questionToAdd)
        .then((qta) => {
                console.log("The new question has been add successfully to the database.");
                console.log(qta)
        }).catch((err) => {
                console.log("A problem occurred, while trying to save the new question:")
                console.log(questionToAdd)
                console.log(err)
        })
        
    res.redirect("/add_question")
})

// Start server
app.listen(3000, () => {
    console.log("Listening on port 3000");

})


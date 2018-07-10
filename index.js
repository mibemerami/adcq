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

// Configure template-engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// Define routes
app.get("/", (req, res) => {
    console.log(req.query);

    /*
    data.getDocuURLs({filter: req.query.q})
        
        .then((questions)=>{
            questions.sortByTopic()
        })
        .then((sortetQuestions) => {
            res.render("home", {questions: sortetQuestions})
        })*/
    data.getDocuURLs({ filter: req.query.q })
        .then((sortetQuestions) => {
            res.render("home", { questions: sortetQuestions })
        })

    // res.render("home")
})

app.get("/questions-run", (req, res) => {
    data.getQuestionByID({ _id: req.query.id })
        .then(question => data.getAllQuestionsForTest(question.url))
        .then(questions => { 
            helpers.runQuestions(questions, res)
        })
        .catch(err => console.log(err))
        
    // res.send("start testing has been called")
})

app.get("/add_question/", (req, res) => {
    res.render("add_question")
})

// Start server
app.listen(3000, () => {
    console.log("Listening on port 3000");

})


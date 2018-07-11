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
        showQuestionsOnTestRun: function(){ 
            console.log("Type of questions is:")
            console.log(typeof this.questions[0].answer)
            console.log("This is: ")
            console.log(this);
            
            return this.questions[0].answer},
        supplyQuestions: function(){
            return JSON.stringify({questionsArray: this.questions  }).replace(/\n|\r/g, "")
        }  
      }
})
app.engine("handlebars", hbs.engine )
app.set("view engine", "handlebars")

/*
app.engine("handlebars", exphbs({ defaultLayout: "main" }) )
app.set("view engine", "handlebars")
*/

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
        .catch(err => console.log(err))
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


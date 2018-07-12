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
    console.log(req.query);
    data.getQuestionCategories({ filter: req.query.q })
        .then((result) => {
            //let topics = result.map(q => q.topic) 
            let urlsWithTopics = result.map(q1 => { 
                
                return result.filter(q2 => q1.url === q2.url).map(q3 => q3.topic) 
            })
            console.log("The topics are: ", urlsWithTopics);

            res.render("home", { questions: result })
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

app.get("/add_question/", (req, res) => {
    res.render("add_question")
})

// Start server
app.listen(3000, () => {
    console.log("Listening on port 3000");

})


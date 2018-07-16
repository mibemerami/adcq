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

app.get("/question_details", (req, res) => {
    data.getQuestionByID(req.query.id)
        .then(result => {
            res.render("question_details", { question: result })
        })
        .catch(err => console.log(err))

})

app.post("/update_question", (req, res) => {
    data.getQuestionByID({ _id: req.query.id })
        .then(result => {
            result.question = req.body.questionText.trim(),
            result.answer = req.body.answer.trim(),
            result.topic = req.body.topic.trim(),
            result.url = req.body.URL.trim(),
            result.tags = req.body.tags.split(",").map(tag => tag.trim().toLowerCase()),
            result.author = req.body.author.trim(),
            result.comment = req.body.comment
            result.save()
                .then(updatedResult => {
                    console.log("Update succesfull:")
                    console.log(updatedResult)
                    res.redirect("/questions-run?id=" + req.query.id)
                })
                .catch(err => console.log("Error while updating a question:", err))
        })
        .catch(err => console.log("Error while loading a qustion: ", err))
})

app.post("/delete_question", (req, res) => {
    if(req.query.delete){
        data.getQuestionByID({ _id: req.query.id })
            .then(result => {
                result.remove()
                    .then(x => {
                        console.log("The question has been removed")
                        res.redirect("/")
                    })
                    .catch(err => console.log("Error while deleting a question.", err))
            })
            .catch(err => console.log("Error while loading a qustion: ", err))
    }else{
        data.getQuestionByID({ _id: req.query.id })
            .then(result => {
                res.render("delete_question_confirmation",  { question: result })
            })
            .catch(err => console.log("Error while loading a qustion: ", err))
        
    }
    // res.send("delete question was called")
})

// Start server
app.listen(3000, () => {
    console.log("Listening on port 3000");

})


const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const data = require("./lib/data")
const helpers = require("./lib/helpers")
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// Connect to MongoDB
mongoose.Promise = global.Promise  // Mongoose Promise is depricated
mongoose.connect("mongodb://localhost:27017/adcq")
    .then(() => {
        console.log(
            "Cennection to Mongo DB successfull."
        );
    })
    .catch((err) => console.log(err))

// Passport Config
require('./lib/passport')(passport);

// Load routes
const users = require('./routes/users');

// Initialize server
let app = express()

// Add middleware
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Express session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// Passport 
app.use(passport.initialize());
app.use(passport.session());
// Flash 
app.use(flash());
// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

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
app.get("/", helpers.ensureAuthenticated, (req, res) => {
    data.getQuestionCategories()
        .then((result) => {
            let normalizedResult = helpers.normalizeQueryResultForStartPage(result)
            res.render("home", { questions: normalizedResult })
        })
        .catch(err => console.log(err))
})

app.get("/questions-run", helpers.ensureAuthenticated, (req, res) => {
    data.getQuestionByID({ _id: req.query.id })
        .then(question => data.getAllQuestionsForTest(question.url))
        .then(questions => {
            helpers.runQuestions(questions, res)
        })
        .catch(err => console.log(err))
})

app.get("/add_question", helpers.ensureAuthenticated, helpers.ensureRoleDevOrBetter, (req, res) => {
    res.render("add_question")
})

app.post("/add_question", helpers.ensureAuthenticated, helpers.ensureRoleDevOrBetter, (req, res) => {
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

app.get("/question_details", helpers.ensureAuthenticated, (req, res) => {
    data.getQuestionByID(req.query.id)
        .then(result => {
            res.render("question_details", { question: result })
        })
        .catch(err => console.log(err))

})

app.post("/update_question", helpers.ensureAuthenticated, helpers.ensureRoleDevOrBetter, (req, res) => {
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

app.post("/delete_question", helpers.ensureAuthenticated, helpers.ensureRoleDevOrBetter, (req, res) => {
    console.log("A post request has been received on delete_question. With query string:")
    console.log(req.query);
    
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
})

// TODO:
// app.get("/admin", helpers.ensureAuthenticated, helpers.ensureRoleAdminOrBetter, (req, res) => {
app.get("/admin", helpers.ensureAuthenticated, helpers.ensureRoleAdminOrBetter, (req, res) => {
    res.render("users/update")
})

// Use routes from router
app.use('/users', users);

// Start server
app.listen(3000, () => {
    console.log("Listening on port 3000");

})


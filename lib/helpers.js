

helpers = {}

helpers.runQuestions = (questions, res) => {
    console.log("helpers.runQuestions()");
    console.log(questions);
    
    questions.forEach(question => {
        console.log(question);
        
    })
    res.render("show_question", {questions: questions})
}
helpers.removeObjectsWithDublicateValuesFromArray = (rawArr, value) => {
    let leanArr = rawArr.reduce((akkumulator, item) => { if (akkumulator.findIndex(akkuItem => akkuItem[value] === item[value]) < 0) { akkumulator.push(item); } return akkumulator }, [])
    return leanArr
}
helpers.removeDublicateValuesFromArray = (rawArr) => {
    let leanArr = rawArr.reduce((akkumulator, item) => { if (akkumulator.indexOf(item) < 0) { akkumulator.push(item); } return akkumulator }, [])
    return leanArr
}
helpers.normalizeQueryResultForStartPage = (result) => {
    let urlsWithAggregatedTopics = result.map(q1 => {
        return { url: q1.url, _id: q1._id, topics: result.filter(q2 => q1.url === q2.url).map(q3 => q3.topic) }
    })
    let normalizedUrlsWithAggregatedTopics = helpers
        .removeObjectsWithDublicateValuesFromArray(urlsWithAggregatedTopics, "url")
    let normalizedURlsWithNormalizedTopics = normalizedUrlsWithAggregatedTopics
        .map(q1 => { q1.topics = helpers.removeDublicateValuesFromArray(q1.topics); return q1 })
    return normalizedURlsWithNormalizedTopics
}
helpers.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'Not Authorized')
    res.redirect('/users/login')
}
helpers.ensureRoleDevOrBetter = (req, res, next) => {
    if (req.user.role === "developer" || req.user.role === "administrator") {
        return next();
    }
    req.flash('error_msg', 'Not Authorized')
    res.redirect('back')
}
helpers.ensureRoleAdminOrBetter = (req, res, next) => {
    if (req.user.role === "administrator") {
        return next();
    }
    req.flash('error_msg', 'Not Authorized')
    res.redirect('back')
}

module.exports = helpers

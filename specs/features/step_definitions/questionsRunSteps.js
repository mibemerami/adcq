const { client } = require('nightwatch-cucumber')
const { Given, When, Then } = require('cucumber')

const questionsRunPage = client.page.questionsRunPage()
const now = Date.now().toString()


When('the questions run starts', function () {
    return questionsRunPage
        .waitForElementVisible("@pageHeading")
        .waitForElementVisible("@detailsButton")
        .waitForElementVisible("@backButton")
        .waitForElementVisible("@nextButton")
        .waitForElementVisible("@questionParagraph")
        .checkQuestionNotEmpty()
});

When('I note every element on the questions run page', function () {
    return questionsRunPage.noteDownCurrentValues(now)
    // return 'pending';
});

When('I click back', function () {
    return questionsRunPage.clickBack()
});

Then('nothing changes on the questions run page', function () {
    return questionsRunPage.assertNoChange(now)
});







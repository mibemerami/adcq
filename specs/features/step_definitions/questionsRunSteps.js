const { client } = require('nightwatch-cucumber')
const { Given, When, Then } = require('cucumber')

const questionsRunPage = client.page.questionsRunPage()


When('the questions run starts', function () {
    return questionsRunPage
        .waitForElementVisible("@pageHeading")
        .waitForElementVisible("@detailsButton")
        .waitForElementVisible("@backButton")
        .waitForElementVisible("@nextButton")
        .waitForElementVisible("@questionParagraph")
        .checkQuestionNotEmpty()
});

When('I note every element on the page of the questions run', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I click back', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('nothing changes', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});







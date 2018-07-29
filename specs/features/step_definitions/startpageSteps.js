const { client } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');

const mainPage = client.page.mainPage()

When(/^I open the start page$/, () => {
    mainPage.navigate()
    return client
        .waitForElementVisible('body', 1000)
        .pause(2000)
});

Then('I can see a {string} in the nav-bar', (string) => {
    console.log('looking for', string)
    return mainPage.checkAppTitle(string)
    // return 'pending'
});




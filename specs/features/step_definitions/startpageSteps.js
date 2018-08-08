const { client } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');

const mainPage = client.page.mainPage()

When(/^I open the start page$/, () => {
    mainPage.navigate()
    return client
        .waitForElementVisible('body', 1000)
        .pause(2000)
})

Then('I can see {string} as application title in the nav-bar', (string) => {
    console.log('looking for', string)
    return mainPage.checkAppTitle(string)
    // return 'pending'
})

Then('I can see the list of articles', function () {
    return client
                .waitForElementVisible(mainPage.elements.articleLinks.selector)
                .getText(mainPage.elements.articleLinks.selector, (links) => {
                    console.log("A link from the list:")
                    console.log(links)
                    client.assert.ok(links.value.includes('http'))
                })
    
});

Given('I click the link to a question run', function () {
    return mainPage.startFirstTestRun()
});






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
                .getText(mainPage.elements.articleLinks.selector, (link) => {
                    client.assert.ok(link.value.includes('http'))
                })
})

Given('I click the link to a question run', function () {
    return mainPage.startFirstTestRun()
})

When('I click the link to the article of an item in the list', function () {
    return client.url((firstUrl) => {
        mainPage.callFirstArticle()
        client.url((secondUrl) => {
            client.assert.ok(firstUrl.value !== secondUrl.value)
        })
    })
})

Then('a page of the atlassian documentaiton opens', function () {
    client.url((articleUrl) => {    
        client.assert.ok(articleUrl.value.includes("atlassian"))
    })
});








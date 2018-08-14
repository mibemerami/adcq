const { client } = require('nightwatch-cucumber')
const {Given, When, Then } = require('cucumber')

const loginPage = client.page.loginPage()

Given('I am logged out', () => {
    return client.url(client.launchUrl+'/users/logout')
})

Given('I am logged in', () => {
    let user = process.env.TESTUSER
    let pw = process.env.TESTUSERPW
    console.log("Try login with: ", user, pw)    
    loginPage.navigate()
    return loginPage.login(user, pw)
})

Given('I am logged in as administrator', () => {
    let user = process.env.TESTUSER
    let pw = process.env.TESTUSERPW
    console.log("Try login with: ", user, pw)
    loginPage.navigate()
    return loginPage.login(user, pw)
})

Then('I can see {string} in the nav-bar', function (string) {
    return client.useXpath()
                .waitForElementVisible('//nav//a[text() = "' + string + '"]')
                .useCss()
})

Then('I can see the login form', function () {
    return loginPage.checkLoginForm()
})


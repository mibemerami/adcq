const { client } = require('nightwatch-cucumber')
const {Given, When, Then } = require('cucumber')

const loginPage = client.page.loginPage()

Given('I am logged out', () => {
    return client.url(client.launchUrl+'/users/logout')
})

Given('I am logged in', () => {
    loginPage.navigate()
    return loginPage.login('mrp@tralala.net', 'Ver1fach!')
})


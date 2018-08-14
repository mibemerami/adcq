module.exports = {

    
    url: function () {
        return this.api.launchUrl+'/users/login'
    },

    elements: {

        // shorthand, specifies selector
        loginFormEmail: 'input[name="email"]',
        loginFormPW: 'input[name="password"]',
        loginFormSubmitButton: 'button.btn.btn-primary'

    },

    commands: [
        {
            isLoggedin: function () {
                return false  // TODO
            },
            login: function (userMail, password) {
                return this.clearValue('@loginFormEmail')
                .setValue('@loginFormEmail', userMail)
                .clearValue('@loginFormPW')
                .setValue('@loginFormPW', password)
                .click('@loginFormSubmitButton')
            },
            checkNavBarLinkText: function (linkText) {
                return this.useXpath()
                    .waitForElementVisible('//nav//a[text() = "'+linkText+'"]')
                    .useCss()
            },
            checkLoginForm: function () {
                return this.waitForElementVisible('@loginFormEmail')
                            .waitForElementVisible('@loginFormPW')
            }
            
        }
    ],

    // object version (best considered immutable)
    props: {
        myPauseTime: 1000
    }


}


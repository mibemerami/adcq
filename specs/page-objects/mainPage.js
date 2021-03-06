
module.exports = {


    url: function () {
        return this.api.launchUrl
    },

    elements: {
        applicationTitle: { 
            selector: 'a.navbar-brand', 
            locateStrategy: 'css selector' 
        },
        startTestRunButtons: {
            selector: '//a[text() = "Start Testing"]',
            locateStrategy: 'xpath'
        },
        articleLinks: {
            selector: 'a.btn.btn-outline-info',
            locateStrategy: 'css selector'
        }

    },

    commands: [
        {
            // example
            myCustomPause: function () {
                this.api.pause(this.props.myPauseTime)
            },
            checkAppTitle: function (linkText) {
                return this.api.expect.element(this.elements.applicationTitle.selector).text.to.equal(linkText)
            },
            startFirstTestRun: function () {
                return this.click('@startTestRunButtons')
            },
            callFirstArticle: function () {
                return this
                        .click("@articleLinks")
                        .waitForElementVisible("body")
            }
        }
    ],

    // object version (best considered immutable)
    props: {
        myPauseTime: 1000
    }


}




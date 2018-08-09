

module.exports = {

    elements: {
        applicationTitle: {
            selector: 'a.navbar-brand',
            locateStrategy: 'css selector'
        },
        pageHeading: {
            selector: '//h1[text() = "Test Run"]',
            locateStrategy: "xpath"
        },
        detailsButton: {
            selector: 'a#detailsLink',
            locateStrategy: 'css selector'
        },
        backButton: {
            selector: '//button[text() = "Back"]',
            locateStrategy: 'xpath'
        },
        nextButton: {
            selector: '//button[text() = "Next"]',
            locateStrategy: 'xpath'
        },
        questionParagraph: {
            selector: 'p#question',
            locateStrategy: 'css selector'
        },
        answerParagraph: {
            selector: 'p#answer',
            locateStrategy: 'css selector'
        },
        doneMessageParagraph: {
            selector: 'p#doneInfo',
            locateStrategy: 'css selector'
        },
        tagsList: {
            selector: 'p#tagsDisplay',
            locateStrategy: 'css selector'
        }

    },

    commands: [
        {
            // example
            myCustomPause: function () {
                this.api.pause(this.props.myPauseTime)
            },
            checkQuestionNotEmpty: function (result) {
                this.waitForElementVisible('@questionParagraph')
                    .getText('@questionParagraph', (result) => {
                        this.api.assert.ok(result.value.length > 1)
                    })
            }
        }
    ],

    // object version (best considered immutable)
    props: {
        myPauseTime: 1000
    }


}






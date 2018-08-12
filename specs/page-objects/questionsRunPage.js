

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
            },
            noteDownCurrentValues: function (timestamp) {
                console.log('questionsRunPage.noteDownCurrentValues', timestamp)
                console.log(this.props)
                this.props[timestamp] = {}
                this.waitForElementVisible('@questionParagraph')
                    .getText('@questionParagraph', (result) => {
                        this.props[timestamp].questionText = result.value
                    })
                    .getText('@answerParagraph', (result) => {
                        this.props[timestamp].answerText = result.value
                    })
                    .getText('@tagsList', (result) => {
                        this.props[timestamp].tagsList = result.value
                    })
            },
            assertNoChange: function (timestamp) {
                console.log('questionsRunPage.assertNoChange', timestamp)
                console.log(this.props)
                this.waitForElementVisible('@questionParagraph')
                    .getText('@questionParagraph', (result) => {
                        this.api.assert.ok(this.props[timestamp].questionText === result.value)
                    })
                    .getText('@answerParagraph', (result) => {
                        this.api.assert.ok(this.props[timestamp].answerText === result.value)
                    })
                    .getText('@tagsList', (result) => {
                        this.api.assert.ok(this.props[timestamp].tagsList === result.value)
                    })
            },
            clickBack: function () {
                this.waitForElementVisible('@backButton')
                    .click('@backButton')
            },
            clickNext: function () {
                this.waitForElementVisible('@nextButton')
                    .click('@nextButton')
            }
        }
    ],

    // object version (best considered immutable)
    props: {
        myPauseTime: 1000
    }


}






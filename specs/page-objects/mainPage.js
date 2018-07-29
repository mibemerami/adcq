
module.exports = {

    
    url: function () {
        return this.api.launchUrl
    },

    elements: {

        // shorthand, specifies selector
        applicationTitle: 'a.navbar-brand',
    

        // full
        myTextInput: {
            selector: 'input[type=text]',
            locateStrategy: 'css selector'
        }

    },

    commands: [
        {
            myCustomPause: function () {
                this.api.pause(this.props.myPauseTime)
            },
            checkAppTitle: function (linkText) {
                console.log('checking App Title.')
                this.api.expect.element('@applicationTitle').text.to.equal(linkText)
            }
        }
    ],

    // object version (best considered immutable)
    props: {
        myPauseTime: 1000
    }

    
}




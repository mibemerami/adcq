

module.exports = {

    elements: {
        applicationTitle: {
            selector: 'a.navbar-brand',
            locateStrategy: 'css selector'
        },

    },

    commands: [
        {
            // example
            myCustomPause: function () {
                this.api.pause(this.props.myPauseTime)
            }
        }
    ],

    // object version (best considered immutable)
    props: {
        myPauseTime: 1000
    }


}






const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

require('nightwatch-cucumber')({
    cucumberArgs: ['--require', 'specs/features/step_definitions',  '--format', 'json:specs/reports/cucumber.json', 'specs/features']
})

module.exports = {
    output_folder: './specs/reports',
    custom_assertions_path: '',
    live_output: false,
    disable_colors: false,
    page_objects_path: "./specs/page-objects",

    test_workers: true,

    selenium: {
        start_process: true,
        server_path: seleniumServer.path,
        log_path: './specs',
        host: '127.0.0.1',
        port: 4444
    },
    test_settings: {
        default: {
            launch_url: 'http://localhost:3000',
            selenium_port: 4444,
            selenium_host: '127.0.0.1',
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true
            },
            selenium: {
                cli_args: {
                    'webdriver.chrome.driver': chromedriver.path
                }
            }
        },
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true
            },
            selenium: {
                cli_args: {
                    'webdriver.chrome.driver': chromedriver.path
                }
            }
        },
        chrome_headless: {
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true,
                chromeOptions: {
                    args: ['incognito', 'headless', 'no-sandbox', 'disable-gpu']
                }
            },
            selenium: {
                cli_args: {
                    'webdriver.chrome.driver': chromedriver.path
                }
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                javascriptEnabled: true,
                marionette: true
            },
            selenium: {
                cli_args: {
                    'webdriver.gecko.driver': geckodriver.path
                }
            }
        }
    }
}





let config = {}

config.dev = {
    appTitle: "Atlassian Docu Control Questions",
    appTitleBrev: "ADCQ",
    port: process.env.PORT || 3000,
    mongoURI: "mongodb://localhost:27017/adcq",
    defaultAdmin: {
        email: "admin@nowhere.com",
        name: "admin",
        password: "loijdsho48432kjhuh230fv890s03nsddk89vnbvhopo",
        role: "administrator"
    }
}

config.prod = {
    appTitle: "Atlassian Docu Control Questions",
    appTitleBrev: "ADCQ",
    port: process.env.PORT || 80,
    mongoURI: "mongodb://localhost:27017/adcq",
    defaultAdmin: {
        email: "admin@nowhere.com",
        name: "admin",
        password: "loijdsho48432kjhuh230fv890s03nsddk89vnbvhopo",
        role: "administrator"
    }
}

let confEnv = process.env.ENVIRONMENT || "dev"

module.exports = config[confEnv]


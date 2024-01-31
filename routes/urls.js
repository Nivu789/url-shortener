const express = require('express')
const urlRoute = express()
const session = require('express-session')
const urlFunctions = require('../controllers/urlFunctions')
urlRoute.set('views','./views')

urlRoute.use(session({
    secret:"my-secret",
    resave: false,
    saveUninitialized: false,
}))

urlRoute.get('/',urlFunctions.loadLogin)

urlRoute.get('/home',urlFunctions.getHome)

urlRoute.post('/generate-url',urlFunctions.shortenUrl)

urlRoute.post('/register',urlFunctions.registerUser)

urlRoute.post('/login',urlFunctions.loginUser)

urlRoute.get('/:shortId',urlFunctions.visitRequestedSite)

module.exports = urlRoute
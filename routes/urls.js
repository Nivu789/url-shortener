const express = require('express')
const urlRoute = express()
const session = require('express-session')
const urlFunctions = require('../controllers/urlFunctions')
const auth = require('../middlewears/auth')
urlRoute.set('views','./views')

urlRoute.use(session({
    secret:"my-secret",
    resave: false,
    saveUninitialized: false,
}))

urlRoute.get('/',auth.isLogout,urlFunctions.loadLogin)

urlRoute.get('/home',auth.isLogin,urlFunctions.getHome)

urlRoute.post('/generate-url',urlFunctions.shortenUrl)

urlRoute.post('/register',urlFunctions.registerUser)

urlRoute.post('/login',urlFunctions.loginUser)

urlRoute.get('/:shortId',urlFunctions.visitRequestedSite)

urlRoute.post('/delete-url',urlFunctions.deleteUrl)

urlRoute.get('/user/logout',auth.isLogin,urlFunctions.logoutUser)

module.exports = urlRoute
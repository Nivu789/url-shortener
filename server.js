const express = require('express')
const app = express()
const urlRoute = require('./routes/urls')
const PORT = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/url-shortener')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

app.set('view engine','ejs')

app.use('/',urlRoute)


app.listen(PORT,()=>{
    console.log("Server is running")
})
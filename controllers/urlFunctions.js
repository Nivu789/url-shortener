const shortid = require('shortid');
const URL = require('../models/urlModel')
const User = require('../models/userModel');


const getHome = async(req,res) =>{
    if(req.session.email){
        const userData = await User.findOne({email:req.session.email})
        console.log(userData)
        const urlData = await URL.findOne({userId:userData._id})
        res.render('home',{userData,urlData})
    }
}

const loadLogin = async(req,res) =>{
    res.render('register_login')
}

const registerUser = async(req,res) =>{
    console.log(req.body.password)
    await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    console.log("user Added")
}

const loginUser = async(req,res) =>{
    const userData = await User.findOne({email:req.body.email})
    if(userData){
        if(userData.password==req.body.password){
            req.session.email = req.body.email
            res.redirect('/home')
        }else{
            console.log("Wrong credentials")
        }
    }
}

const shortenUrl = async(req,res) =>{
    const shortId = shortid.generate()
    const userData = await User.findOne({email:req.session.email})
    let visitedHistory = {time:Date.now()} 
    const url = new URL({
        shortId:shortId,
        requestedUrl:req.body.url,
        userId:userData._id
    })
    url.visitedHistory.push(visitedHistory)
    await url.save()
    res.redirect("/home")
}

const visitRequestedSite = async(req,res) =>{
    const shortId = req.params.shortId
    console.log("Short id is",shortId)
    const urlData = await URL.findOne({shortId:shortId})
    console.log(urlData)
    if(urlData){
        console.log(urlData.requestedUrl)
        res.redirect(urlData.requestedUrl)
    }
}

module.exports = {getHome,shortenUrl,registerUser,loginUser,loadLogin,visitRequestedSite}
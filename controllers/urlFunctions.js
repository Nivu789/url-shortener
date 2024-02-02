const shortid = require('shortid');
const URL = require('../models/urlModel')
const User = require('../models/userModel');


const getHome = async(req,res) =>{
    if(req.session.email){
        const userData = await User.findOne({email:req.session.email})
        console.log(userData)
        const urlData = await URL.find({userId:userData._id})
        console.log(urlData.length)
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
    const url = new URL({
        shortId:shortId,
        requestedUrl:req.body.url,
        userId:userData._id
    })
    
    await url.save()
    res.redirect("/home")
}

const visitRequestedSite = async(req,res) =>{
    const shortId = req.params.shortId
    console.log("Short id is",shortId)
    if(shortId){
        const urlData = await URL.findOne({shortId:shortId})
    console.log(urlData)
    let visited = {time:Date.now()}
    console.log("IP address",req.ip)
    if(urlData){
        console.log(urlData.requestedUrl)
        urlData.visitedHistory.push(visited)
        urlData.save()
        res.redirect(`${urlData.requestedUrl}`)
    }
    }
    
}

const deleteUrl = async(req,res) =>{
    const urlId = req.body.urlId
    await URL.findByIdAndDelete({_id:urlId})
    res.redirect('/home')
}

const logoutUser = async(req,res) =>{
    req.session.destroy()
    res.redirect('/')
}

module.exports = {getHome,shortenUrl,registerUser,loginUser,loadLogin,visitRequestedSite,logoutUser,deleteUrl}
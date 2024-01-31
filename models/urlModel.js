const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    shortId:{
        type:String,
        unique:true,
        required:true
    },
    requestedUrl:{
        type:String,
        required:true
    },
    visitedHistory:[{
        time:{
            type:Date
        }
    }],
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
})

const URL = mongoose.model('url',urlSchema)

module.exports = URL
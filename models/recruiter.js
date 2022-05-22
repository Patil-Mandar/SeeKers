const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const recruiterSchema = mongoose.Schema({
    username:String,
    emailID:{
        type:String,
        unique:true
    },
    photo:String,
    jobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Job'
        }
    ]
})

recruiterSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Recruiter',recruiterSchema)
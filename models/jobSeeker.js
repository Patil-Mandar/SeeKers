const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require("mongoose-findorcreate")

const JobseekerSchema = mongoose.Schema({
    name:String,
    photo:String,
    email:{
        type:String,
        unique: true
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        req:'Profile'
    }
})

JobseekerSchema.plugin(passportLocalMongoose)
JobseekerSchema.plugin(findOrCreate)

Jobseeker = mongoose.model('Jobseeker',JobseekerSchema)


module.exports = Jobseeker
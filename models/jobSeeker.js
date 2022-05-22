const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require("mongoose-findorcreate")

const JobseekerSchema = mongoose.Schema({
    name:String,
    photo:String,
    email:String,
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        req:'Profile'
    }
})

JobseekerSchema.plugin(passportLocalMongoose)
JobseekerSchema.plugin(findOrCreate)

module.exports = mongoose.model('Jobseeker',JobseekerSchema)
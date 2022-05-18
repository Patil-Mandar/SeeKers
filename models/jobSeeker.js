const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const JobseekerSchema = mongoose.Schema({
    email:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true
    }
})

JobseekerSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Jobseeker',JobseekerSchema)
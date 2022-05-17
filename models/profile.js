const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema({
    id:Number,
    name:String,
    mailID:String,
    gender:String,
    age:Number,
    currentLocation:String,
    degree:String,
    major:String,
    jobExperience:Number,
    skills:Array,
    college:String,
    jobHistory:Array
})

module.exports = mongoose.model('Profile',ProfileSchema)
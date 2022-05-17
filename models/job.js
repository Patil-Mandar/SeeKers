const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
    id:Number,
    company:String,
    jobTitle:String,
    category:String,
    type:String,
    mode:String,
    salary:Number,
    minAge:Number,
    minExperience:Number,
    reqDegree:Array,
    reqMajor:Array,
    reqSkills:Array,
    goodToHaveSkills:Array,
    location:String
})

module.exports = mongoose.model('Job',JobSchema)
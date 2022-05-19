const mongoose = require('mongoose')
const listOfData = require('../seeds/seedHelper')


const ProfileSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Jobseeker'
    },
    name:String,
    mailID:String,
    gender:{
        type:mongoose.Schema.Types.String,
        enum:listOfData.genders
    },
    age:Number,
    currentLocation:{
        type:mongoose.Schema.Types.String,
        enum:listOfData.locations
    },
    degree:{
        type:mongoose.Schema.Types.String,
        enum:listOfData.degrees
    },
    major:{
        type:mongoose.Schema.Types.String,
        enum:listOfData.majors
    },
    jobExperience:Number,
    skills:[
        {
            type:mongoose.Schema.Types.String,
            enum:listOfData.skills
        }
    ],
    college:{
        type:mongoose.Schema.Types.String,
        enum:listOfData.colleges
    },
    jobHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Job'
        }
    ]
})

module.exports = mongoose.model('Profile',ProfileSchema)
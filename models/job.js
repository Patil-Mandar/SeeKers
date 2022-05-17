const mongoose = require('mongoose')
const listOfData = require('../seeds/seedHelper')


const JobSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.String,
        enum: listOfData.companies
    },
    jobTitle: String,
    category: {
        type: mongoose.Schema.Types.String,
        enum: listOfData.categories
    },
    type: {
        type: mongoose.Schema.Types.String,
        enum: listOfData.types
    },
    mode: {
        type: mongoose.Schema.Types.String,
        enum: listOfData.modes
    },
    salary: Number,
    minAge: Number,
    minExperience: Number,
    reqDegree: [
        {
        type: mongoose.Schema.Types.String,
        enum: listOfData.degrees
        }
    ],
    reqMajor: [
        {
        type: mongoose.Schema.Types.String,
        enum: listOfData.majors
        }
    ],
    reqSkills: [
        {
        type: mongoose.Schema.Types.String,
        enum: listOfData.skills
        }
    ],
    goodToHaveSkills: [
        {
        type: mongoose.Schema.Types.String,
        enum: listOfData.skills
        }
    ],
    location: {
        type: mongoose.Schema.Types.String,
        enum: listOfData.locations
    }
})

module.exports = mongoose.model('Job', JobSchema)
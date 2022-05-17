const { similarity } = require('./similarityAlgo')
// const { Jobs, Users } = require('../temp/data')
let Job = require('../models/job')
let User = require('../models/profile')
let Jobs = []
let Users = []

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/JobRecommendationSystem')
    .then(data => console.log('Database connected Algo'))
    .catch(err => console.log('Database connection failed Algo'))


const isEligible = (user, job) => {
    //Checks the eligibility of user for the user

    return user.age >= job.minAge &&
        user.jobExperience >= job.minExperience &&
        job.reqDegree.includes(user.degree) &&
        job.reqMajor.includes(user.major) &&
        job.reqSkills.every(val => user.skills.includes(val))
}




const getJobsCandidateSet = (user) => {
    //Returns condidate set(set of jobs whose preferense is to be found) for a user

    let canditateSet = []
    Jobs.forEach((job) => {
        if (isEligible(user, job)) canditateSet.push(job)
    })
    return canditateSet
}


const getUsersCandidateSet = (job) => {
    //Returns condidate set(set of users whose preferense is to be found) for a job

    let canditateSet = []
    Users.forEach((user) => {
        if (isEligible(user, job)) canditateSet.push(user)
    })
    return canditateSet
}


const preference = (user, job) => {
    //returns the calculated preference rating of user and job

    return similarity.userJobSimilarity(user, job)
}


const recommendKjobs = async (user, k) => {
    //returns k most recommended jobs for user

    Jobs = await Job.find()
    Users = await User.find()
    let preferenceList = {}
    let canditateSet = getJobsCandidateSet(user)

    canditateSet.forEach((job) => {
        preferenceList[job.id] = preference(user, job)
    })
    preferenceList = Object.entries(preferenceList).sort((a, b) => b[1] - a[1])

    return preferenceList.slice(0, k)
}


const recommendKusers = async (job, k) => {
    //returns k most recommended jobs for user

    Jobs = await Job.find()
    Users = await User.find()
    let preferenceList = {}
    let canditateSet = getUsersCandidateSet(job)

    canditateSet.forEach((user) => {
        preferenceList[user.id] = preference(user, job)
    })
    preferenceList = Object.entries(preferenceList).sort((a, b) => b[1] - a[1])

    return preferenceList.slice(0, k)
}

module.exports = { recommendKjobs }
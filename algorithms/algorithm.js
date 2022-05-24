const { similarity } = require('./similarityAlgo')
let Job = require('../models/job')
let Profile = require('../models/profile')
let Jobs = []
let Users = []


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
    Users = await Profile.find()
    let preferenceList = {}
    let canditateSet = getUsersCandidateSet(job)

    canditateSet.forEach((user) => {
        preferenceList[user.id] = preference(user, job)
    })
    preferenceList = Object.entries(preferenceList).sort((a, b) => b[1] - a[1])

    return preferenceList.slice(0, k)
}

module.exports = { recommendKjobs,recommendKusers }

// const test = async ()=>{
//     const profile = await Profile.findById('628a01656df50f8d37eb8143')
//     const ans = await recommendKjobs(profile,5)
//     console.log(ans)
// }

// test()
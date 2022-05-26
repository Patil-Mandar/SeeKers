const { similarity } = require('./similarityAlgo')
const Job = require('../models/job')
const Profile = require('../models/profile')

let Jobs = []
let Users = []


//Checks the eligibility of user for the job
const isEligible = (user, job) => {
    return user.age >= job.minAge &&
        user.jobExperience >= job.minExperience &&
        job.reqDegree.includes(user.degree) &&
        job.reqMajor.includes(user.major) &&
        job.reqSkills.every(val => user.skills.includes(val))
}




//Returns condidate set(set of jobs whose preferense is to be found) for a user
const getJobsCandidateSet = (user) => {
    let canditateSet = []
    Jobs.forEach((job) => {
        if (isEligible(user, job)) canditateSet.push(job)
    })
    return canditateSet
}


//Returns condidate set(set of users(profiles) whose preferense is to be found) for a job
const getUsersCandidateSet = (job) => {
    let canditateSet = []
    Users.forEach((user) => {
        if (isEligible(user, job)) canditateSet.push(user)
    })
    return canditateSet
}


//returns the calculated preference rating of user(profile) and job
const preference = (user, job) => {

    //finding similarity between user(profile) and job
    let userJobSimilarity = similarity.userJobSimilarity(user, job) 
    
    if(user.jobHistory.length == 0) return userJobSimilarity

    //finding avg similarity between user's past job and current job
    let total = 0
    user.jobHistory.forEach(pastJob=>{
        total += similarity.jobSimilarity(pastJob,job)
    })
    let previousJobsSimilarity = total/user.jobHistory.length

    return (userJobSimilarity+previousJobsSimilarity)/2
}


//returns k most recommended jobs for user(profile)
const recommendKjobs = async (user, k) => {

    let preferenceList = {}
    Jobs = await Job.find()

    let canditateSet = getJobsCandidateSet(user)
    canditateSet.forEach((job) => {
        preferenceList[job.id] = preference(user, job)
    })
    preferenceList = Object.entries(preferenceList).sort((a, b) => b[1] - a[1])

    return preferenceList.slice(0, k)
}


//returns k most recommended jobs for user
const recommendKusers = async (job, k) => {

    // Jobs = await Job.find()
    Users = await Profile.find().populate('jobHistory')
    let preferenceList = {}
    let canditateSet = getUsersCandidateSet(job)

    canditateSet.forEach((user) => {
        preferenceList[user.id] = preference(user, job)
    })
    preferenceList = Object.entries(preferenceList).sort((a, b) => b[1] - a[1])

    return preferenceList.slice(0, k)
}

module.exports = { recommendKjobs,recommendKusers }

//testing of algorithm
// const test = async ()=>{
//     const job = await Job.find({})
//     const ans = await recommendKusers(job[1],5)
//     console.log(ans)
// }

// test()
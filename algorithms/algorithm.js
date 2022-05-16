const {similarity} = require('./similarityAlgo')
const { Jobs, Users } = require('../data')

//Checks the eligibility of user for the user
const isEligible = (user,job) => {
    if(
        user.age<job.minAge && 
        user.jobExperience<job.minExprience && 
        !job.reqDegree.includes(user.degree) &&
        !job.reqMajor.includes(user.major) &&
        !(job.reqSkills.every(val => user.skills.includes(val)))
    ) return false

    else return true
}


//Returns condidate set(set of jobs whose preferense is to be found) for a user
const getCandidateSet = (user) => {
    let canditateSet = []

    Jobs.forEach((job)=>{
        if(isEligible(user,job)) canditateSet.push(job)
    })

    return canditateSet
}

//returns the calculated preference rating of user and job
const preference = (user,job)=>{
    return similarity.userJobSimilarity(user,job)
}

//returns k most recommended jobs for user
const recommendKjobs = (user,k) =>{
    let preferenceList = {}
    let canditateSet = getCandidateSet(user)
    
    canditateSet.forEach((job)=>{
        preferenceList[job.id] = preference(user,job)
    })
    preferenceList = Object.entries(preferenceList).sort((a,b) => b[1]-a[1])
    
    return preferenceList.slice(0,k)
}

console.log(recommendKjobs(Users[0],2))
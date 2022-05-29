const express = require('express')
const router = express.Router()

const listOfData = require('../seeds/seedHelper')
const CatchAsync = require('../utils/CatchAsync')
const {isLoggedIn} = require('../middleware')
const Profile = require('../models/profile')
const Recruiter = require('../models/recruiter')
const Job = require('../models/job')
const {recommendKusers} = require('../algorithms/algorithm')


router.get('/new',CatchAsync(async (req,res)=>{
    res.render('job/new',{listOfData})
}))

router.post('/', CatchAsync(async (req, res) => {
    const job = new Job(req.body.job)
    job.author = req.user._id
    await job.save()
    const user = req.user
    user.jobs.push(job._id)
    await Recruiter.findByIdAndUpdate(user._id,user)
    res.redirect(`/recruiter/job/${job._id}`)
}))

router.get('/:id',CatchAsync(async(req,res)=>{
    const {id} = req.params
    const job = await Job.findById(id).populate('author')
    res.render('job/show',{job})
}))

router.get('/:id/analysis',CatchAsync(async(req,res)=>{
    const {id} = req.params
    const job = await Job.findById(id)
    const preferenceList = await recommendKusers(job,5)
    const profiles = []
    for(let i of preferenceList){
        let profile = await Profile.findById(i[0])
        profiles.push(profile)
    }
    res.render('job/analysis',{profiles})
}))

router.get('/:id/edit',CatchAsync(async(req,res)=>{
    const {id} = req.params
    const job = await Job.findById(id)
    res.render('job/edit',{job,listOfData})
}))

router.put('/:id',CatchAsync(async(req,res)=>{
    const {id} = req.params
    await Job.findByIdAndUpdate(id, {...req.body.job})
    res.redirect(`/recruiter/job/${id}`)
}))

router.delete('/:id',CatchAsync(async(req,res)=>{
    const {id} = req.params
    await Recruiter.findByIdAndUpdate(req.user._id, {$pull:{jobs:id}}) //pull(remove element from array) will remove the review with id reviewid
    await Job.findByIdAndDelete(id)
    res.redirect('/recruiter/dashboard')
}))

module.exports = router
const CatchAsync = require('../utils/CatchAsync')
const listOfData = require('../seeds/seedHelper')
const Job = require('../models/job')
const Recruiter = require('../models/recruiter')
const Profile = require('../models/profile')
const {recommendKusers} = require('../algorithms/algorithm')


module.exports.renderNewJobForm = CatchAsync(async (req,res)=>{
    res.render('job/new',{listOfData})
})

module.exports.createNewJob = CatchAsync(async (req, res) => {
    const job = new Job(req.body.job)
    job.author = req.user._id
    await job.save()
    const user = req.user
    user.jobs.push(job._id)
    await Recruiter.findByIdAndUpdate(user._id,user)
    req.flash('success','New Job Added')
    res.redirect(`/recruiter/job/${job._id}`)
})

module.exports.showJob = CatchAsync(async(req,res)=>{
    const {id} = req.params
    const job = await Job.findById(id).populate('author')
    res.render('job/show',{job})
})

module.exports.renderEditJobForm = CatchAsync(async(req,res)=>{
    const {id} = req.params
    const job = await Job.findById(id)
    res.render('job/edit',{job,listOfData})
})

module.exports.editJob = CatchAsync(async(req,res)=>{
    const {id} = req.params
    await Job.findByIdAndUpdate(id, {...req.body.job})
    req.flash('success','Job Edited')
    res.redirect(`/recruiter/job/${id}`)
})

module.exports.recommendProfiles = CatchAsync(async (req, res) => {
    const { id } = req.params
    const job = await Job.findById(id)
    const preferenceList = await recommendKusers(job, 5)
    const profiles = []
    for (let i of preferenceList) {
        let profile = await Profile.findById(i[0]).populate('jobHistory')
        profiles.push(profile)
    }
    res.render('job/analysis', { profiles })
})

module.exports.deleteJob =  CatchAsync(async (req, res) => {
    const { id } = req.params
    await Recruiter.findByIdAndUpdate(req.user._id, { $pull: { jobs: id } }) //pull(remove element from array) will remove the review with id reviewid
    await Job.findByIdAndDelete(id)
    req.flash('error','Job deleted')
    res.redirect('/recruiter/dashboard')
})
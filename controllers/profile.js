const CatchAsync = require('../utils/CatchAsync')
const Job = require('../models/job')
const Profile = require('../models/profile')
const listOfData = require('../seeds/seedHelper')
const { recommendKjobs } = require('../algorithms/algorithm')


module.exports.renderNewProfileForm = CatchAsync(async (req, res) => {
    const jobs = await Job.find({})
    res.render('profile/new', { listOfData, jobs })
})

module.exports.createNewProfile = CatchAsync(async (req, res) => {
    const profile = new Profile(req.body.profile)
    await profile.save()
    const user = req.user
    user.profile = profile._id
    await Jobseeker.findByIdAndUpdate(user._id, user)
    req.flash('success','Created the Profile')
    res.redirect('/dashboard/')
})

module.exports.renderEditProfileForm = CatchAsync(async (req, res) => {
    const profile = await Profile.findById(req.user.profile)
    const jobs = await Job.find({})
    res.render('profile/edit', { listOfData, profile, jobs })
})

module.exports.editProfile = CatchAsync(async (req, res) => {
    const id = req.user.profile;
    const newProfile = req.body.profile
    if (!newProfile.jobHistory) newProfile.jobHistory = []
    await Profile.findByIdAndUpdate(id, { ...req.body.profile })
    req.flash('success','Profile edited')
    res.redirect(`/dashboard/`)
})

module.exports.recommendJobs = CatchAsync(async (req, res) => {
    const profile = await Profile.findById(req.user.profile).populate('jobHistory')
    const preferenceList = await recommendKjobs(profile, 5)
    const jobs = []
    for (let i of preferenceList) {
        let job = await Job.findById(i[0])
        jobs.push(job)
    }
    res.render('jobseeker/analysis', { jobs })
})
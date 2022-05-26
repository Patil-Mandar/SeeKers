const express = require('express')
const router = express.Router()
const CatchAsync = require('../utils/CatchAsync')
const listOfData = require('../seeds/seedHelper')
const Profile = require('../models/profile')
const Job = require('../models/job')
const {validateProfile,isLoggedIn,createdProfile} = require('../middleware')
const { recommendKjobs } = require('../algorithms/algorithm')
const Jobseeker = require('../models/jobseeker')


router.get('/new',isLoggedIn,CatchAsync(async (req,res)=>{
    const jobs = await Job.find({})
    res.render('profile/new',{listOfData,jobs})
}))

router.post('/',isLoggedIn, CatchAsync(async (req, res) => {
    const profile = new Profile(req.body.profile)
    await profile.save()
    const user = req.user
    user.profile = profile._id
    await Jobseeker.findByIdAndUpdate(user._id,user)
    res.redirect('/dashboard/')
}))

router.get('/edit',isLoggedIn,createdProfile,CatchAsync( async (req, res) => {
    const profile = await Profile.findById(req.user.profile)
    const jobs = await Job.find({})
    res.render('profile/edit', {listOfData,profile,jobs})
}))

router.put('/edit',isLoggedIn,createdProfile,validateProfile,CatchAsync(async (req, res) => {0
    const id = req.user.profile;
    const newProfile = req.body.profile
    if(!newProfile.jobHistory) newProfile.jobHistory = []
    const profile = await Profile.findByIdAndUpdate(id, {...req.body.profile})
    res.redirect(`/dashboard/`)
}))

// router.delete('/:id', CatchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Profile.findByIdAndDelete(id);
//     res.redirect('/profile');
// }))

router.get('/analysis', isLoggedIn, createdProfile, CatchAsync(async (req, res) => {
    const profile = await Profile.findById(req.user.profile).populate('jobHistory')
    const preferenceList = await recommendKjobs(profile, 5)
    const jobs = []
    for (let i of preferenceList) {
        let job = await Job.findById(i[0])
        jobs.push(job)
    }
    res.render('jobseeker/analysis', { jobs })
}))

module.exports = router
const express = require('express')
const router = express.Router()
const CatchAsync = require('../utils/CatchAsync')
const listOfData = require('../seeds/seedHelper')
const Profile = require('../models/profile')
const Job = require('../models/job')
const {validateProfile,isLoggedIn,createdProfile} = require('../middleware')
const Jobseeker = require('../models/jobseeker')

// router.get('/',CatchAsync(async(req,res)=>{
//     const profiles = await Profile.find({})
//     res.render('profile/index',{profiles})
// }))

// router.get('/new',isLoggedIn,CatchAsync(async (req,res)=>{
router.get('/new',CatchAsync(async (req,res)=>{
    const jobs = await Job.find({})
    res.render('profile/new',{listOfData,jobs})
}))

// router.get('/:id',CatchAsync(async(req,res)=>{
//     const {id} = req.params
//     const profile = await Profile.findById(id)
//     if(!profile){
//         return res.redirect('/profile')
//     }
//     res.render('profile/show',{profile})
// }))

// router.post('/',isLoggedIn,validateProfile, CatchAsync(async (req, res) => {
router.post('/',CatchAsync(async (req, res) => {
    console.log(req.body.profile)
    res.redirect('/profile/new')
    const profile = new Profile(req.body.profile)
    await profile.save()
    const user = req.user
    user.profile = profile._id
    await Jobseeker.findOneAndUpdate(user._id,user)
    res.redirect('/dashboard/')
}))

router.get('/edit',isLoggedIn,createdProfile,CatchAsync( async (req, res) => {
    const profile = await Profile.findById(req.user.profile)
    const jobs = await Job.find({})
    res.render('profile/edit', {listOfData,profile,jobs})
}))

router.put('/edit',isLoggedIn,createdProfile,validateProfile,CatchAsync(async (req, res) => {0
    const id = req.user.profile;
    const profile = await Profile.findByIdAndUpdate(id, {...req.body.profile})
    res.redirect(`/dashboard/`)
}))

// router.delete('/:id', CatchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Profile.findByIdAndDelete(id);
//     res.redirect('/profile');
// }))

module.exports = router
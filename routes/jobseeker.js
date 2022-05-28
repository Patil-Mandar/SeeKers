const express = require('express')
const passport = require('passport')
const jobseeker = require('../controllers/jobseeker')
const Profile = require('../models/profile')
const Job = require('../models//job')
const CatchAsync = require('../utils/CatchAsync')
const {validateProfile,isLoggedIn,createdProfile} = require('../middleware')
const router = express.Router()

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  jobseeker.login
)

router.get('/logout', jobseeker.logout)

router.get('/dashboard', isLoggedIn, CatchAsync(async (req, res) => {
  const user = req.user
  if (user.profile) {
      const profile = await Profile.findById(user.profile).populate('jobHistory')
      res.render('jobseeker/dashboard', { user, profile })
  } else {
      res.render('jobseeker/dashboard', { user, profile: null })
  }
}))

router.get('/jobs',CatchAsync(async(req,res)=>{
  const jobs = await Job.find({})
  res.render('jobseeker/allJobs',{jobs})
}))

router.get('/job/:id',CatchAsync(async(req,res)=>{
  const {id} = req.params
  const job = await Job.findById(id).populate('author')
  res.render('job/show',{job})
}))


module.exports = router
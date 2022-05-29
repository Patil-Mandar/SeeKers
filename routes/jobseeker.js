const express = require('express')
const passport = require('passport')

const jobseeker = require('../controllers/jobseeker')
const {isLoggedInAsJobseeker} = require('../middleware')

const router = express.Router()

router.get('/',jobseeker.renderHomePage)

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  jobseeker.login
)

router.get('/logout', jobseeker.logout)

router.get('/dashboard', isLoggedInAsJobseeker,jobseeker.renderDashboardPage)

router.get('/jobs',jobseeker.showAllJobs)

router.get('/job/:id',jobseeker.showJob)


module.exports = router
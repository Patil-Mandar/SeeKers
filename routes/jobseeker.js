const express = require('express')
const passport = require('passport')
const jobseeker = require('../controllers/jobseeker')
const router = express.Router()

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  jobseeker.login
)

router.get('/logout', jobseeker.logout)

module.exports = router
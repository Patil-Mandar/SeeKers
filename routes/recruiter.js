const express = require('express')
const CatchAsync = require('../utils/CatchAsync')
const recruiter = require('../controllers/recruiter')
const passport = require('passport')
const router = express.Router()

router.get('/register', recruiter.renderRegistrationForm)

router.post('/register', CatchAsync(recruiter.createNewRecruiter))

router.get('/login', recruiter.renderLoginForm)

router.post('/login',
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/recruiter/login' }),
    CatchAsync(recruiter.login)
)

router.get('/logout', recruiter.logout)

module.exports = router
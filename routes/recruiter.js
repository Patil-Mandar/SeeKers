const express = require('express')
const recruiter = require('../controllers/recruiter')
const passport = require('passport')
const { isLoggedInAsRecruiter } = require('../middleware')
const router = express.Router()

router.get('/', recruiter.renderHomePage)

router.route('/register')
    .get(recruiter.renderRegistrationForm)
    .post(recruiter.createNewRecruiter)

router.route('/login')
    .get(recruiter.renderLoginForm)
    .post(
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/recruiter/login' }),
        recruiter.login
    )

router.get('/logout', recruiter.logout)

router.get('/dashboard', isLoggedInAsRecruiter, recruiter.renderDashboard)

router.get('/profiles', recruiter.showAllProfiles)

module.exports = router
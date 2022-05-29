const Recruiter = require('../models/recruiter')
const CatchAsync = require('../utils/CatchAsync')
const Profile = require('../models/profile')

module.exports.renderHomePage = (req, res) => {
    res.render('recruiter/home')
}

module.exports.renderRegistrationForm = (req, res) => {
    res.render('recruiter/registrationForm')
}

module.exports.createNewRecruiter = CatchAsync(async (req, res) => {
    try {
        const { username, emailID, password } = req.body
        const user = new Recruiter({ username, emailID })
        const registeredUser = await Recruiter.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Registered Successfully!')
            res.redirect('/recruiter/dashboard')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/recruiter/register')
    }
})

module.exports.renderLoginForm = (req, res) => {
    res.render('recruiter/login')
}

module.exports.login = (req, res) => {
    req.flash('success','Welcome Back')
    res.redirect('/recruiter/dashboard')
}

module.exports.logout = CatchAsync(async (req, res) => {
    req.logOut();
    req.flash('warning','Sayonara')
    res.redirect('/recruiter')
})

module.exports.renderDashboard = CatchAsync(async (req, res) => {
    const user = await Recruiter.findById(req.user._id).populate('jobs')
    res.render('recruiter/dashboard', { user })
})

module.exports.showAllProfiles = CatchAsync(async (req, res) => {
    const profiles = await Profile.find({}).populate('jobHistory')
    res.render('recruiter/allProfiles', { profiles })
})
const CatchAsync = require('../utils/CatchAsync')
const Profile = require('../models/profile')
const Job = require('../models/job')

module.exports.renderHomePage = (req, res) => {
    res.render('jobseeker/home')
  }

module.exports.login = (req, res) => {
    req.flash('success', 'LogedIn Successfully!')
    res.redirect('/dashboard');
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('warning', 'Sayonara!')
    res.redirect('/');
}

module.exports.renderDashboardPage = CatchAsync(async (req, res) => {
    const user = req.user
    if (user.profile) {
        const profile = await Profile.findById(user.profile).populate('jobHistory')
        res.render('jobseeker/dashboard', { user, profile })
    } else {
        res.render('jobseeker/dashboard', { user, profile: null })
    }
  })
  module.exports.showAllJobs = CatchAsync(async(req,res)=>{
    const jobs = await Job.find({})
    res.render('jobseeker/allJobs',{jobs})
  })

module.exports.showJob = CatchAsync(async(req,res)=>{
    const {id} = req.params
    const job = await Job.findById(id).populate('author')
    res.render('job/show',{job})
  })
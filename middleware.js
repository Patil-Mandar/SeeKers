const {profileSchema,jobSchema} = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Job = require('./models/job')
const CatchAsync = require('./utils/CatchAsync')

module.exports.validateProfile = (req, res, next) => {
    //checks the profile data
    const { error } = profileSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateJob = (req,res,next)=>{
    //checks the job data
    const { error } = jobSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isLoggedInAsJobseeker = (req, res, next) => {
    if (req.user && req.user.photo) {
        next();
    } else {
        req.flash('error','Login First')
        res.redirect('/google')
    }
}

module.exports.isLoggedInAsRecruiter = (req, res, next) => {
    if (req.user && req.user.salt) {
        next();
    } else {
        req.flash('error','Login First')
        res.redirect('/recruiter/login')
    }
}

module.exports.hasCreatedProfile = (req,res,next)=>{
    //checkes if jobseeker has created profile or not
    if(req.user.profile){
        next();
    }else{
        req.flash('error','You need to create a Profile first')
        res.redirect('/profile/new')
    }
}

module.exports.isAuthorOfJob = CatchAsync(async (req,res,next)=>{
    //checkes if job was created by this recruiter or not
    const {id} = req.params
    const job = await Job.findById(id)
    if(job.author == req.user._id){
        next()
    }else{
        req.flash('warning','You are not authorized')
        res.redirect('/recruiter/dashboard')
    }
})
const Recruiter = require('../models/recruiter')

module.exports.renderRegistrationForm = (req,res)=>{
    res.render('recruiter/registrationForm')
}

module.exports.createNewRecruiter = async(req,res)=>{
    try{
        const {username,emailID,password} = req.body
        const user = new Recruiter({username,emailID})
        const registeredUser = await Recruiter.register(user,password)
        req.login(registeredUser,err =>{
            if(err) return next(err)
            req.flash('success','Registered Successfully!')
            res.redirect('/recruiter/dashboard')
        })
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/recruiter/register')
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render('recruiter/login')
}

module.exports.login = async(req,res)=>{
    res.redirect('/recruiter/dashboard')
}

module.exports.logout = (req, res) => {
    req.logOut();
    res.redirect('/recruiter')
}
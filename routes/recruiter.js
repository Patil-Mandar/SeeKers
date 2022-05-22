const express = require('express')
const CatchAsync = require('../utils/CatchAsync')
const Recruiter = require('../models/recruiter')
const passport = require('passport')
const router = express.Router()

router.get('/register',(req,res)=>{
    res.render('recruiter/registrationForm')
})

router.post('/register',async(req,res)=>{
    try{
        const {username,emailID,password} = req.body
        const user = new Recruiter({username,emailID})
        const registeredUser = await Recruiter.register(user,password)
        req.login(registeredUser,err =>{
            if(err) return next(err)
            res.redirect('/recruiter/dashboard')
        })
    }catch(e){
        res.redirect('/recruiter/register')
    }
})

router.get('/login',(req,res)=>{
    res.render('recruiter/login')
})

router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/recruiter/login'}),async(req,res)=>{
    res.redirect('/recruiter/dashboard')
})

router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('warning','Sayonara!')
    res.redirect('/campground')
})

module.exports = router
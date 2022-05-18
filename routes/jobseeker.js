const express = require('express')
const JObseeker = require('../models/jobSeeker')
const router = express.Router()

router.get('/register',(req,res)=>{
    res.render('jobseeker/register')
})

module.exports = router
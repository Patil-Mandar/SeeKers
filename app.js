const express = require('express')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const path = require('path')

const ExpressError = require('./utils/ExpressError')
const CatchAsync = require('./utils/CatchAsync')
const Profile = require('./models/profile')
const app = express()

mongoose.connect('mongodb://localhost:27017/JobRecommendationSystem')
    .then(data => console.log('Database connected'))
    .catch(err => console.log('Database connection failed'))

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render('home')
})


//to resposne all undefined routes
app.all('*',(req,res)=>{
    throw new ExpressError(`Page not found`,404)
})

//Basic error handler
app.use((err,req,res,next)=>{
    const {statusCode=500} = err   //gave some default values
    if(!err.message) err.message = "Something went wrong"
    res.status(statusCode).render('error',{err})
})

app.listen(3000,()=>{
    console.log('Serving on port 3000')
})
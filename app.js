const express = require('express')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override');
const passport = require('passport')
const localStrategy = require('passport-local')
const ExpressError = require('./utils/ExpressError')
const CatchAsync = require('./utils/CatchAsync')
const Jobseeker = require('./models/jobSeeker')
const profileRoutes = require('./routes/profile')
const jobseekerRoutes = require('./routes/jobseeker')
const app = express()
const session = require('express-session')

mongoose.connect('mongodb://localhost:27017/JobRecommendationSystem')
    .then(data => console.log('Database connected'))
    .catch(err => console.log('Database connection failed'))

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(Jobseeker.authenticate()))
passport.serializeUser(Jobseeker.serializeUser())
passport.deserializeUser(Jobseeker.deserializeUser())

app.use('/profile',profileRoutes)
app.use('/',jobseekerRoutes)

app.get('/',(req,res)=>{
    res.render('home')
})



//to resposne all undefined routes
app.all('*',(req,res)=>{
    throw new ExpressError(`Page not found`,404)
})


//Basic error handler
app.use((err,req,res,next)=>{
    const {statusCode=500} = err
    if(!err.message) err.message = "Something went wrong"
    res.status(statusCode).render('error',{err})
})

app.listen(3000,()=>{
    console.log('Serving on port 3000')
})
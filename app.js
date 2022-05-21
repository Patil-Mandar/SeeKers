require('dotenv').config()
const express = require('express')
const path = require('path')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const ExpressError = require('./utils/ExpressError')
const CatchAsync = require('./utils/CatchAsync')
const Jobseeker = require('./models/jobseeker')
const Profile = require('./models/profile')
const profileRoutes = require('./routes/profile')
const jobseekerRoutes = require('./routes/jobseeker')
const {profile} = require('console')


const app = express()


//connecting with DB
mongoose.connect('mongodb://localhost:27017/JobRecommendationSystem')
    .then(data => console.log('Database connected'))
    .catch(err => console.log('Database connection failed'))


app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//session config
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
app.use(flash())

//passport config
app.use(passport.initialize())
app.use(passport.session())
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, cb) {
    await Jobseeker.findOrCreate(
        {googleId: profile.id,name:profile.displayName,photo:profile.photos[0].value},
        function (err, user) {
            return cb(err, user);
        })
  }
))
passport.serializeUser(function(user, done) {done(null, user)})
passport.deserializeUser(function(user, done) {done(null, user)})


//middleware for flashing all msg
app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')       
    res.locals.warning = req.flash('warning')
    res.locals.error = req.flash('error')
    next()
})

app.use('/',jobseekerRoutes)

app.get('/dashboard',async (req,res)=>{
    const user = req.user
    if(user.profile){
        const profile = await Profile.findById(user.profile)
        res.render('jobseeker/dashboard',{user,profile})
    }else{
        res.render('jobseeker/dashboard',{user,profile:null})
    }
})

// app.get('/dashboard/:id',async(req,res)=>{
//     const { id } = req.params;
//     const user = req.user
//     const profile = await Profile.findById(id)
//     res.render('jobseeker/dashboard',{user,profile})
// })

app.use('/profile',profileRoutes)


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
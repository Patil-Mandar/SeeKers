const express = require('express')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override');

const ExpressError = require('./utils/ExpressError')
const CatchAsync = require('./utils/CatchAsync')
const Profile = require('./models/profile')
const { redirect } = require('express/lib/response')
const app = express()

mongoose.connect('mongodb://localhost:27017/JobRecommendationSystem')
    .then(data => console.log('Database connected'))
    .catch(err => console.log('Database connection failed'))

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/profile',CatchAsync(async(req,res)=>{
    const profiles = await Profile.find({})
    res.render('profile/index',{profiles})
}))
app.get('/profile/new',async (req,res)=>{
    res.render('profile/new')
})
app.get('/profile/:id',CatchAsync(async(req,res)=>{
    const {id} = req.params
    const profile = await Profile.findById(id)
    if(!profile){
        return res.redirect('/profile')
    }
    res.render('profile/show',{profile})
}))
app.post('/profile', CatchAsync(async (req, res) => {
    const profile = new Profile(req.body.profile);
    await profile.save();
    res.redirect(`/profile/${profile._id}`)
}))
app.get('/profile/:id/edit',CatchAsync( async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    res.render('profile/edit', { profile });
}))
app.put('/profile/:id', CatchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, { ...req.body.profile });
    res.redirect(`/profile/${profile._id}`)
}));
app.delete('/profile/:id', CatchAsync(async (req, res) => {
    const { id } = req.params;
    await Profile.findByIdAndDelete(id);
    res.redirect('/profile');
}))

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
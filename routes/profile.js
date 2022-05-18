const express = require('express')
const router = express.Router()
const CatchAsync = require('../utils/CatchAsync')
const Profile = require('../models/profile')
const {validateProfile} = require('../middleware')

router.get('/',CatchAsync(async(req,res)=>{
    const profiles = await Profile.find({})
    res.render('profile/index',{profiles})
}))

router.get('/new',async (req,res)=>{
    res.render('profile/new')
})

router.get('/:id',CatchAsync(async(req,res)=>{
    const {id} = req.params
    const profile = await Profile.findById(id)
    if(!profile){
        return res.redirect('/profile')
    }
    res.render('profile/show',{profile})
}))

router.post('/',validateProfile, CatchAsync(async (req, res) => {
    const profile = new Profile(req.body.profile);
    await profile.save();
    res.redirect(`/profile/${profile._id}`)
}))

router.get('/:id/edit',CatchAsync( async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    res.render('profile/edit', { profile });
}))

router.put('/:id',validateProfile,CatchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, { ...req.body.profile });
    res.redirect(`/profile/${profile._id}`)
}))

router.delete('/:id', CatchAsync(async (req, res) => {
    const { id } = req.params;
    await Profile.findByIdAndDelete(id);
    res.redirect('/profile');
}))

module.exports = router
const express = require('express')
const router = express.Router()
const profile = require('../controllers/profile')
const { validateProfile, hasCreatedProfile, isLoggedInAsJobseeker } = require('../middleware')



router.get('/new', isLoggedInAsJobseeker, profile.renderNewProfileForm)

router.post('/', isLoggedInAsJobseeker, validateProfile, profile.createNewProfile)

router.route('/edit')
    .get(isLoggedInAsJobseeker, hasCreatedProfile, profile.renderEditProfileForm)
    .put(isLoggedInAsJobseeker, hasCreatedProfile, validateProfile, profile.editProfile)

router.get('/analysis', isLoggedInAsJobseeker, hasCreatedProfile, profile.recommendJobs)

module.exports = router
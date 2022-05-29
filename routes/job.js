const express = require('express')
const router = express.Router()

const job = require('../controllers/job')
const { isLoggedInAsRecruiter, validateJob, isAuthorOfJob } = require('../middleware')


router.get('/new', isLoggedInAsRecruiter, job.renderNewJobForm)

router.post('/', isLoggedInAsRecruiter, validateJob, job.createNewJob)

router.route('/:id')
    .get(isLoggedInAsRecruiter, job.showJob)
    .put(isLoggedInAsRecruiter,isAuthorOfJob, validateJob, job.editJob)
    .delete(isLoggedInAsRecruiter,isAuthorOfJob,job.deleteJob)

router.get('/:id/analysis', isLoggedInAsRecruiter,job.recommendProfiles)

router.get('/:id/edit', isLoggedInAsRecruiter, job.renderEditJobForm)

module.exports = router
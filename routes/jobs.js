const express = require('express');
const router = express.Router();

//importing controllers_functions
const {
 getAllJobs,
 getJob,
 createJob,
 updateJob,
 deleteJob
} = require('../controllers/jobs');

//creating the main routes regarding jobs
router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

//exporting the router
module.exports = router;
//importing jobSchema
const Job = require('../models/Job')
//activate"Status-codes"forErrors
const {
 StatusCodes
} = require('http-status-codes');
//importing"BadRequest,NotFoundError"
const {
 BadRequestError,
 NotFoundError
} = require('../errors')


//creating the all function regarding Jobs

//GetAllJobs
const getAllJobs = async (req, res) => {
 //sortingTheUsersBasedOn"createdAt"
 const jobs = await Job.find({
  createdBy: req.user.userId
 }).sort('createdAt')

 res.status(StatusCodes.OK).json({
  count: jobs.length,
  jobs
 })
}

//GetSingleJob
const getJob = async (req, res) => {
 res.send('get job');
}

//CreateSingleJob
const createJob = async (req, res) => {
 req.body.createdBy = req.user.userId;
 const job = await Job.create(req.body)
 res.status(StatusCodes.CREATED).json({
  job
 })
}

//UpdateSingleJob
const updateJob = async (req, res) => {
 res.send('updateJob');
}

//DeleteSingleJob
const deleteJob = async (req, res) => {
 res.send('delete job');
}

//exporting the Jobs-functions
module.exports = {
 getAllJobs,
 getJob,
 createJob,
 updateJob,
 deleteJob
}
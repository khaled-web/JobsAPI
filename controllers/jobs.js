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
 const {
  user: {
   userId
  },
  params: {
   id: jobId
  }
 } = req

 const job = await Job.findOne({
  _id: jobId,
  createdBy: userId
 })

 if (!job) {
  throw new NotFoundError(`No job with id ${jobId}`)
 }
 res.status(StatusCodes.OK).json({
  job
 })
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
 const {
  body: {
   company,
   position
  },
  user: {
   userId
  },
  params: {
   id: jobId
  }
 } = req

 if (company === '' || position === '') {
  throw new BadRequestError('company or position fields can not be empty')
 }

 const job = await Job.findByIdAndUpdate({
  _id: jobId,
  createdBy: userId
 }, req.body, {
  new: true,
  runValidators: true
 })
 if (!job) {
  throw new NotFoundError(`No job with id ${jobId}`)
 }
 res.status(StatusCodes.OK).json({
  job
 })

}

//DeleteSingleJob
const deleteJob = async (req, res) => {
 const {
  user: {
   userId
  },
  params: {
   id: jobId
  }
 } = req

 const job = await Job.findByIdAndRemove({
  _id: jobId,
  createdBy: userId
 })

 if (!job) {
  throw new NotFoundError(`No job with id ${jobId}`);
 }

 res.status(StatusCodes.OK).json({
  job
 })
}

//exporting the Jobs-functions
module.exports = {
 getAllJobs,
 getJob,
 createJob,
 updateJob,
 deleteJob
}
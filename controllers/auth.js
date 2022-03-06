//importing "schemaModels" for user
const User = require('../models/User')
//errors-packages_httpStatusCode
const {
 StatusCodes
} = require('http-status-codes');
//importing BadRequestErrors 
const {
 BadRequestError,
 UnauthenticatedError
} = require('../errors');



//RegisterFunction
const register = async (req, res) => {
 const {
  name,
  email,
  password
 } = req.body;

 //errorChecking
 if (!name || !email || !password) {
  throw new BadRequestError('please provide name, email, password');
 }

 //start creating the user from "schemaModel_User"
 const user = await User.create({
  ...req.body
 });

 const token = user.createJWT();

 res.status(StatusCodes.CREATED).json({
  user: {
   name: user.name,
  },
  token
 }); //statusCode_201
}


//LoginFunction
const login = async (req, res) => {
 const {
  email,
  password
 } = req.body;

 if (!email || !password) {
  throw new BadRequestError('Please provide email, password');
 }

 const user = await User.findOne({
  email
 });

 //check on user
 if (!user) {
  throw new UnauthenticatedError('Invalid Credentials')
 }
 //check on password
 const isPasswordCorrect = await user.comparePassword(password)
 if (isPasswordCorrect) { // the correct... if(!isPasswordCorrect)
  throw new UnauthenticatedError('Invalid Credentials')
 }
 const token = user.createJWT();
 res.status(StatusCodes.OK).json({
  user: {
   name: user.name,
  },
  token
 })
}

//exporting the controllers_functions
module.exports = {
 register,
 login
}
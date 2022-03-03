//importing "schemaModels" for user
const User = require('../models/User')
//errors-packages_httpStatusCode
const {
 StatusCodes
} = require('http-status-codes');
//importing BadRequestErrors 
const {
 BadRequestError
} = require('../errors');
//activatePasswordPackage
const bcrypt = require('bcryptjs');



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

 const user = await User.create({
  ...req.body
 });
 res.status(StatusCodes.CREATED).json(user); //statusCode_201
}

//LoginFunction
const login = async (req, res) => {
 res.send('login user');
}

//exporting the controllers_functions
module.exports = {
 register,
 login
}
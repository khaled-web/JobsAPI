//importing "schemaModels" for user
const User = require('../models/User')
//errors-packages_httpStatusCode
const {
 StatusCodes
} = require('http-status-codes');

//RegisterFunction
const register = async (req, res) => {
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
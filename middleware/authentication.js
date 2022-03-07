//importing "schemaModels-user"
const User = require('../models/User');
//importing "JWT"
const jwt = require('jsonwebtoken');
//importing "UnauthenticatedError"
const {
 UnauthenticatedError
} = require('../errors');

const auth = async (req, res, next) => {
 //check header
 const authHeader = req.headers.authorization;
 if (!authHeader || !authHeader.startsWith('Bearer ')) {
  throw new UnauthenticatedError('Authentication invalid');
 }
 const token = authHeader.split(' ')[1];
 try {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  //attach the user to the job routes
  req.user = {
   userId: payload.userId, //back to schemaModel_user.js
   name: payload.name,
  }
  next(); //very important step
 } catch (error) {
  throw new UnauthenticatedError('Authentication invalid');
 }
}

module.exports = auth;
const mongoose = require('mongoose');
//password_package
const bcrypt = require('bcryptjs');
//activate "JWT-package"
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, 'please provide name'],
  minLength: 3,
  maxLength: 50,
 },

 email: {
  type: String,
  required: [true, 'please provide email'],
  match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email'],
  unique: true
 },

 password: {
  type: String,
  required: [true, 'please provide password'],
  minLength: 6,
  // maxLength: 12 //we will remove this property for hashingPassword_bcryptjs-package
 }
})

//saving the userData(name,email,password) 
UserSchema.pre('save', async function () {
 //hashing the password
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
});

// assign a function to the "methods" object of our UserSchema
UserSchema.methods.createJWT = function () {
 //installing jwt
 return jwt.sign({
  userId: this._id, //payload for JWT
  name: this.name
 }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_LIFETIME
 })
}



//exporting schemaModel
module.exports = mongoose.model('User', UserSchema);
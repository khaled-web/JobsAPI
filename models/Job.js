const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
 company: {
  type: String,
  required: [true, 'Please provide company name'], // if property is empty
  maxLength: 50,
 },

 position: {
  type: String,
  required: [true, 'Please provide position'],
  maxLength: 100
 },

 status: {
  type: String,
  enum: ['interview', 'declined', 'pending'], //optionProperty
  default: 'pending'
 },

 createdBy: {
  type: mongoose.Types.ObjectId,
  ref: 'User',
  required: [true, 'Please provide user']
 }
}, {
 timestamps: true, // to get createdAt and updatedAt(schemaOption) 
})

//exporting schemaModel
module.exports = mongoose.model('Job', JobSchema)
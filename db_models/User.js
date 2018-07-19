const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: { 
    type: String, 
    enum: [ 'user', 'developer', 'admin'],
    default: 'user'
  }
});

module.exports = mongoose.model('users', UserSchema);
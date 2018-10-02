const mongoose = require('mongoose');
const validator = require('validator');
const webToken = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email:{
    required:true,
    type:String,
    minlength:1,
    trim:true,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a valid Email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6,
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token =  webToken.sign({_id:user._id.toHexString(),access:access},'myKey').toString();

  user.tokens.push({
    access:access,
    token:token
  });

  return user.save().then(() => {
    return token;
  });
}

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try {
    decoded = webToken.verify(token,'myKey');
  } catch (e) {
    return Promise.reject('Authentication Required');
  }

  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access': 'auth'
  })
}

var User = mongoose.model('User',UserSchema);

module.exports = {User}

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  countryCode: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  username:{
    type: String,
    required: true,
    unique: true,
  },
  password:{ //encrypt
    type: String,
    required: true,
  },
  nationality:{
    type: String,
    required: true,
  },
  email:{ //verify?
    type: String,
    required: true,
  },
  creditCardNo:{ //encrypt
    type: Number,
    required: true,
  },
  passportNo: {
    type: String,
    required: true,
  },
  isAdmin:{
    type: Boolean,
    required: true,
  }

});

const User = mongoose.model("User", UserSchema);

module.exports = User;
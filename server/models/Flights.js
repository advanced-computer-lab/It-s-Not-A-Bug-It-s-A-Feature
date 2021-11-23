const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  flightNo: {
    type: Number,
    required: true,
    unique: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  economySeats: {
    type: Number,
    required: true,
  },
  businessSeats: {
    type: Number,
    required: true,
  },
  arrivalAirport: {
    type: String,
    required: true,
  },
  departureAirport: {
    type: String,
    required: true,
  },
  departureTerminal: {
    type: String,
    required: true,
  },
  arrivalTerminal: {
    type: String,
    required: true,
  },
  currBusinessSeats:{
    type: Number,
    required: true,
  },
  currEconomySeats:{
    type: Number,
    required: true,
  },
  businessPrice:{
    type: Number,
    required: true,
  },
  economyPrice:{
    type: Number,
    required: true,
  },
  

});

const Flights = mongoose.model("Flights", UserSchema);

module.exports = Flights;
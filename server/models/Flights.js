const mongoose = require("mongoose");

//var dt = new Date();
//long integer_date=dt.getTime();

const UserSchema = new mongoose.Schema({
  flightNo: {
    type: Number,
    required: true,
  },
  departureTime: {
    type: da,
    required: true,
  },
  arrivalTime: {
    type: time,
    required: true,
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

});

const Flights = mongoose.model("Flights", UserSchema);

module.exports = Flights;
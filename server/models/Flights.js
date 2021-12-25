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
    currBusinessSeats: {
        type: Number,
        required: true,
    },
    currEconomySeats: {
        type: Number,
        required: true,
    },
    businessPrice: {
        type: Number,
        required: true,
    },
    economyPrice: {
        type: Number,
        required: true,
    },
    economyBaggage: {
        type: Number,
        required: true
    },
    businessBaggage: {
        type: Number,
        required: true
    },
    reservedSeats: {
        type: [Number],
        required: true,
    },

});

const Flights = mongoose.model("Flights", UserSchema);

module.exports = Flights;

// {
//   "flightNo": 25632589874,
//   "departureDate": "2016-05-12T21:29:00.000Z",
//   "arrivalDate": "2012-12-12T21:29:00.000Z",
//   "economySeats": 12,
//   "businessSeats": 12,
//   "arrivalAirport": "Monaco",
//   "departureAirport": "Tokyo",
//   "departureTerminal": "Terminal 12",
//   "arrivalTerminal": "terminal 12",
//   "businessPrice": "10",
//   "economyPrice": "20"
// }

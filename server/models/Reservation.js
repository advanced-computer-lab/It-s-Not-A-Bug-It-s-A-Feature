const mongoose = require("mongoose");
const Flights = require('../models/Flights.js');
const User = require('../models/User.js');

const UserSchema = new mongoose.Schema({
    reservationID: {
        type: Number,
        required: true,
        unique: true,
    },
    userID: {
        type: String,
        required: true,
    },
    adultsNo: {
        type: Number,
        required: true,
    },
    childrenNo: {
        type: Number,
        required: true,
    },
    seatClass: {
        type: String,
        enum: ['Business', 'Economy'],
        required: true,
    },
    deptFlight: {
        type: String,
        required: true,
    },
    arrFlight: {
        type: String,
        required: true,
    },
    deptSeats: {
        type: [Number],
        required: true,
    },
    arrSeats: {
        type: [Number],
        required: true,
    },
    price: { //calculated
        type: Number,
        required: true,
    }

});

const Reservation = mongoose.model("Reservation", UserSchema);

module.exports = Reservation;











/*Reservation

reservationID
Userid (f)
no of passengers
childNo
adultNo
type of seats

Departureflightid(f)
departureseatsNo

Returnflightid(f)
arrivalseatsNo

price*/

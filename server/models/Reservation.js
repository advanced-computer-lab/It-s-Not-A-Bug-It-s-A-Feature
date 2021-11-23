const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  reservationID: {
    type: Number,
    required: true,
    unique: true,
  },
  userID: { //FK
    type: Number,
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
    enum : ['Business','Economy'],
    required: true,
  },
  deptFlight: { //FK
    type: Number,
    required: true,
  },
  arrFlight: { //FK
    type: Number,
    required: true,
  },
  deptSeats: {
    type: Int16Array,
    required: true,
  },
  arrSeats: {
    type: Int16Array,
    required: true,
  },
  price: { //calculated
    type: Number,
    required: true,
  },

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
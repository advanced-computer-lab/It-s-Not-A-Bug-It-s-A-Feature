const Reservation = require('../models/Reservation');
var router = require('express').Router();
let Flights = require('../models/Flights.js');
let User = require('../models/User.js');
var ObjectID = require('mongodb').ObjectID;

var loggedIn = true;


router.route('/').get((req, res) => {
  if (!loggedIn)
    res.status(200).send("Hello Guest User!");
  else
    res.status(200).send("Hello Logged in User!");
});

router.route('/allUsers').get((req, res) => {
  User.find()
    .then(user => res.send(user))
    .catch(err => res.status(400).send('Error: ' + err));
});
router.route('/allRes').get((req, res) => {
  Reservation.find()
    .then(reservation => res.send(reservation))
    .catch(err => res.status(400).send('Error: ' + err));
});

router.route('/res').post(async (req, res) => { //reserving a flight
  if (!loggedIn)
    res.status(200).send("Log in first"); //todo - redirect to login 
  else {
    console.log(req.body);
    const adultsNo = Number(req.body.adultsNo);
    const childrenNo = Number(req.body.childrenNo);
    const seatClass = (req.body.seatClass);
    const deptFlight = ObjectID(req.body.deptFlight);
    const arrFlight = ObjectID(req.body.arrFlight);
    var deptSeats = [];
    var arrSeats = [];
    deptSeats.push(...req.body.deptSeats);
    arrSeats.push(...req.body.arrSeats);
    const reservationID = Number(req.body.resID); //change, shoould not be input
    const userID = ObjectID("619fd0f4b6432ae913f8784a"); //changeee
    var price = await calculatePrice(deptFlight, seatClass, passengers)
      + await calculatePrice(arrFlight, seatClass, passengers);


    const passengers = adultsNo + childrenNo;
    try {
      if (passengers !== deptSeats.length || passengers !== arrSeats.length)
        throw 'number of passengers does not match number of seats';
    } catch (error) {
      console.error(error);

    }
    const newRes = new Reservation({
      reservationID, userID, adultsNo, childrenNo, seatClass,
      deptFlight, arrFlight, deptSeats, arrSeats, price
    });

    newRes.save()
      .then(() => res.send(newRes))
      .catch(err => res.status(400).send('Error: ' + err));
  }
});

async function calculatePrice(flightID, seatClass, seats) {
  var oneSeat;
  if (seatClass == 'Business') {
    await Flights.findById(flightID)
      .then(flight => oneSeat = flight.businessPrice)
      .catch(err => res.status(400).send('Error: ' + err));
  }
  else {
    await Flights.findById(flightID)
      .then(flight => oneSeat = flight.economyPrice)
      .catch(err => res.status(400).send('Error: ' + err));
  }
  return oneSeat * seats;
}


module.exports = router;



//http://localhost:8000/user/res
// the request body:
// {
//   "resID":"7",
// "adultsNo": "2",
// "childrenNo":"2",
// "seatClass":"Economy",
// "deptFlight": "619fe791b0c98c9ea451953b",
// "arrFlight":"619fe7e6b0c98c9ea451953d",
//  "deptSeats":[1,3,4,5],
// "arrSeats" :[3,16,19,22]

// }
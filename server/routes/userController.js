var router = require('express').Router();
//const Flights = require('../models/Flights.js');
//let adminController = require('./routes/adminController.js');
//let User = require('../models/User.js');

var loggedIn = false;


router.route('/').get((req, res) => {
  if (!loggedIn)
    res.status(200).send("Hello Guest User!");
  else
    res.status(200).send("Hello Logged in User!");
});



module.exports = router;
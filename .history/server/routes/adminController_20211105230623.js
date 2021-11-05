var router = require('express').Router();
const Flights = require('../models/Flights.js');
//let adminController = require('./routes/adminController.js');
let User = require('../models/User.js');



router.route('/').get((req, res) => {
    res.status(200).send("Hello Admin!");
  });

  //for testing to be removed
  router.route('/allFlights').get((req, res) => {
    Flights.find()
    .then(flight => res.send(flight))
    .catch(err => res.status(400).send('Error: '+err));
  });



  router.route('/createFlights').post((req, res) => {
    console.log(req.body);
    const flightNo = Number(req.body.flightNo);
    const departureDate = Date.parse(req.body.departureDate); 
    const arrivalDate = Date.parse(req.body.arrivalDate); 
    const economySeats = Number(req.body.economySeats); 
    const businessSeats = Number(req.body.businessSeats); 
    const arrivalAirport = req.body.arrivalAirport; 
    const departureAirport = req.body.departureAirport; 
    const departureTerminal = req.body.departureTerminal; 
    const arrivalTerminal = req.body.arrivalTerminal; 

    const newFlight = new Flights({flightNo,departureDate,arrivalDate,economySeats
      ,businessSeats,arrivalAirport,departureAirport,departureTerminal,arrivalTerminal});

    newFlight.save()
    .then(()=>res.send('Flight Added'))
    .catch(err => res.status(400).send('Error: '+err));  
  });

  // router.route('/editFlight/:id').get((req, res) => {
  //   //todo
    
  // });

  router.route('/editFlight/:id').post(async (req, res) => {
    Flights.findByIdAndUpdate({_id : (req.params.id)},
      {departureDate:Date.parse(req.body.departureDate),
        flightNo : Number(req.body.flightNo),
        arrivalDate : Date.parse(req.body.arrivalDate),
        economySeats: Number(req.body.economySeats),
        businessSeats : Number(req.body.businessSeats),
        arrivalAirport : req.body.arrivalAirport,
        departureAirport : req.body.departureAirport,
        departureTerminal : req.body.departureTerminal,
        arrivalTerminal : req.body.arrivalTerminal
      }, {runValidators: true}, function(err, result){

      if(err){
          res.send(err)
      }
      // else{
      //     res.send(result)
      // }
});

});

  module.exports = router;
  

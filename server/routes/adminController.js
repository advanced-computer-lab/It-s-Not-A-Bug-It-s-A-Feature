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


  router.route('/searchFlights').post((req, res) => {
    console.log(req.body);
    const flightNo = Number(req.body.flightNo);
    const departureDate = Date.parse(req.body.departureDate); 
    const arrivalDate = Date.parse(req.body.arrivalDate); 
    const departureDate = Date.parse(req.body.arrivalDate); 
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
  router.route('/searchFlights').get((req, res,next) => {
    var query =[];
    var rq=req.query;
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log(rq);

    if(rq.flightNo !='')       query.push({flightNo:rq.flightNo });
    if(rq.arrivalAirport != '') query.push({arrivalAirport:new RegExp(rq.arrivalAirport,'i')});
    if(rq.arrivalTerminal != '')query.push({arrivalTerminal:new RegExp(rq.arrivalTerminal,'i')});
  
    if(rq.arrivalDate != ''){     
      if(rq.arrivalTime!=''){   //time specified  
        var arrivalTime=rq.arrivalTime;
        if(String(rq.arrivalTime.length)==1)  arrivalTime='0'+rq.arrivalTime;
        var string = new String((rq.arrivalDate).substring(0,10) +'T'+arrivalTime+':00:00.000Z');
        console.log(string);
        var arrivalTime = new Date(string).toISOString();
        console.log(string)
        var arrivalTime2 = new Date(new Date(string).getTime() + (1*60*60*1000)).toISOString(); //+1 hr
        query.push({arrivalTime:{$gte:arrivalTime,$lt:arrivalTime2}});
      }
        var arrivalDate=new Date(rq.arrivalDate.substring(0,10)+"T00:00:00.000Z");
        var arrivalDate2= new Date(arrivalDate.getTime() + (24 * 60 * 60 * 1000)); //24 hrs of the day
        query.push({arrivalDate:{$gte:arrivalDate.toISOString(),$lt:arrivalDate2.toISOString()}});
      }
  
  console.log(query);

    var anded = {$and : query};
    console.log(anded);

    if(query.length>0)
       Flights.find(anded, 'flightNo departureDate arrivalDate economySeats businessSeats arrivalAirport departureAirport departureTerminal arrivalTerminal').then( data => res.send(data));

}); 
  module.exports = router;

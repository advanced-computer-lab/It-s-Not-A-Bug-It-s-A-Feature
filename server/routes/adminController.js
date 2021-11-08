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



  router.route('/createFlight').post((req, res) => {
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
  function dateQuery(date,type){  
    var result=JSON.parse('{}');
    var date1=new Date(date.substring(0,10)+"T00:00:00.000Z");
    var date2= new Date(date1.getTime() + (24 * 60 * 60 * 1000)); //24 hrs of the day
    result[type]= JSON.parse('{}');
    result[type]["$gte"]=new Date(date1);
    result[type]["$lt"]=new Date(date2);
    return result;
  }

  function timeQuery(date,time,type)
  {
    var result=JSON.parse('{}');
    var string = new String((date).substring(0,10) +'T'+time+':00.000Z');
    console.log(string);
    var time1 = new Date(string);
    var time2 = new Date(new Date(string).getTime() + (1*60*60*1000)); //+1 hr
    result[type]={$gte:time1,$lt:time2};

    return result;
  }

  router.route('/searchFlights').get((req, res,next) => {
    var query =[];
    var rq=req.query;

    console.log(rq);

    if(rq.flightNo !='')          query.push({flightNo:rq.flightNo });
    if(rq.arrivalAirport != '')   query.push({arrivalAirport:new RegExp(rq.arrivalAirport,'i')});
    if(rq.arrivalTerminal != '')  query.push({arrivalTerminal:new RegExp(rq.arrivalTerminal,'i')});
    if(rq.departureAirport != '') query.push({departureAirport:new RegExp(rq.departureAirport,'i')});
    if(rq.departureTerminal != '')query.push({departureTerminal:new RegExp(rq.departureTerminal,'i')});
  
    if(rq.arrivalDate != ''){     
      if(rq.arrivalTime!='')//time specified  
        query.push(timeQuery(rq.arrivalDate,rq.arrivalTime,'arrivalDate'));
     else
      query.push(dateQuery(rq.arrivalDate,'arrivalDate'));
    }

  if(rq.departureDate != ''){     
    if(rq.departureTime!='')  //time specified  
      query.push(timeQuery(rq.departureDate,rq.departureTime,'departureDate'));
   else
    query.push(dateQuery(rq.departureDate,'departureDate'));
  }
    var anded = {$and : query};
    console.log(query);

        if(query.length>0)
           Flights.find(anded, 'flightNo departureDate arrivalDate economySeats businessSeats arrivalAirport departureAirport departureTerminal arrivalTerminal').then( data => res.send(data));
});

router.route('/deleteFlight/:id').delete((req,res)=>{
  var id = req.params.id;
  console.log(`Deleting flight ID ${id}`);
  Flights.findByIdAndRemove(id, req.body)
        .then((result)=>{
          res.send("Done!");
        })
        .catch(err => res.status(404).json({ error: 'No such flight' }));
});

router.route('/editFlight/:id').get((req, res) => {
  Flights.findById(req.params.id)
  .then(flight => res.send(flight))
  .catch(err => res.status(400).send('Error: '+err));
 
});

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
    else{
        res.send(result)
    }

});
});

  module.exports = router;

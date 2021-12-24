var router = require('express').Router();
const Flights = require('../models/Flights.js');
const Reservation = require('../models/Reservation.js');
//let adminController = require('./routes/adminController.js');
let User = require('../models/User.js');
var nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")

// transporter for sending emails 
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

router.route('/').get(verifyJWT, (req, res) => {
    res.status(200).send("Hello Admin!");
  });

  //for testing to be removed
  router.route('/allFlights').get(verifyJWT, (req, res) => {
    Flights.find()
    .then(flight => res.send(flight))
    .catch(err => res.status(400).send('Error: '+err));
  });

    //for testing to be removed
    router.route('/allUsers').get(verifyJWT, (req, res) => {
      User.find()
      .then(user => res.send(user))
      .catch(err => res.status(400).send('Error: '+err));
    });



  router.route('/createFlight').post(verifyJWT, (req, res) => {
    console.log(req.body);
    console.log("abt to create new flight");
    const flightNo = Number(req.body.flightNo);
    const departureDate = Date.parse(req.body.departureDate); 
    const arrivalDate = Date.parse(req.body.arrivalDate); 
    const economySeats = Number(req.body.economySeats); 
    const businessSeats = Number(req.body.businessSeats); 
    const arrivalAirport = req.body.arrivalAirport; 
    const departureAirport = req.body.departureAirport; 
    const departureTerminal = req.body.departureTerminal; 
    const arrivalTerminal = req.body.arrivalTerminal; 
    const economyBaggage = Number(req.body.economyBaggage);
    const businessBaggage = Number(req.body.businessBaggage);

    const currBusinessSeats = businessSeats;
    const currEconomySeats = economySeats;
    const businessPrice = Number(req.body.businessPrice); 
    const economyPrice = Number(req.body.economyPrice); 
    const reservedSeats = [];

    const newFlight = new Flights({flightNo,departureDate,arrivalDate,economySeats
      ,businessSeats,arrivalAirport,departureAirport,departureTerminal,arrivalTerminal,
          currBusinessSeats,currEconomySeats,businessPrice, economyPrice, economyBaggage, businessBaggage, reservedSeats});

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
        Flights.find(anded, 'flightNo departureDate arrivalDate economySeats businessSeats arrivalAirport departureAirport departureTerminal arrivalTerminal currBusinessSeats currEconomySeats reservedSeats').then( data => res.send(data));
      });

router.route('/deleteFlight/:id').delete(verifyJWT, (req,res)=>{ 
  var id = req.params.id;
  console.log(`Deleting flight ID ${id}`);
  deleteResForFlight(id); //deletes all corresponding reservations in reservation table & email clients
  
  // send emails using returned array from function above
  Flights.findByIdAndRemove(id, req.body) 
       .then((result)=>{
         res.send("Flight Deleted!");
       })
       .catch(err => res.status(404).json({ error: 'No such flight' }));
  
  var emailText = 'Hi!\n The flight with the following ID ' + id + 
  ' has been canceled. Your reservation on this flight has been canceled, and the reservation price has been refunded to your account.';
  console.log("emails");
  var userEmails=emails(id);
    userEmails.forEach(element => {
      sendEmail(element, emailText);
    });
});

async function deleteResForFlight(FlightID){
  var query =[];
  query.push({'deptFlight':FlightID});
  query.push({'arrFlight':FlightID});
  console.log(query);

  console.log({$or : query});
  var ResID;

  await Reservation.find({$or : query},'_id').then(ResIDs=>
  ResID=ResIDs);
  console.log("ID of reservations to be deleted:");
  console.log(ResID);
  console.log({$or:ResID});
  if(ResID.length>0)
    await Reservation.deleteMany({$or:ResID}).then(console.log("deleted corresponding to flight reservations")); 
  }

  async function emails(FlightID){
    var query =[];
    query.push({'deptFlight':FlightID});
    query.push({'arrFlight':FlightID});
    console.log(query);
    console.log({$or : query});
    var userID;
    await Reservation.find({$or : query},{'userID':1,_id:0}).then(userIDs=>
      userID=userIDs);
      console.log("userIDs that need to be informed");
      //console.log(userID);
      var UID=[];
      for(var i = 0; i < userID.length; i++) {    
        UID.push({});
        UID[i]['_id']=userID[i]['userID'];
    }
    console.log(UID);
    var res;
      if(userID.length>0)
        await User.find({$or:UID},{'email':1,_id:0}).then(result =>  
      res=result);
      console.log(res);
      var emails=[];
      for(var i = 0; i < res.length; i++) {    
        emails.push(res[i]['email']);
      
      console.log(emails);
      return emails;
      }
    }


router.route('/editFlight/:id').get(verifyJWT, (req, res) => {
  Flights.findById(req.params.id)
  .then(flight => res.send(flight))
  .catch(err => res.status(400).send('Error: '+err));
});

router.route('/editFlight/:id').post(verifyJWT, async (req, res) => {
  var id=req.params.id;
  Flights.findByIdAndUpdate({ _id: (id) },
    {
      departureDate: Date.parse(req.body.departureDate),
      flightNo: Number(req.body.flightNo),
      arrivalDate: Date.parse(req.body.arrivalDate),
      economySeats: Number(req.body.economySeats),
      businessSeats: Number(req.body.businessSeats),
      arrivalAirport: req.body.arrivalAirport,
      departureAirport: req.body.departureAirport,
      departureTerminal: req.body.departureTerminal,
      arrivalTerminal: req.body.arrivalTerminal,
      economyBaggage: Number(req.body.economyBaggage),
      businessBaggage: Number(req.body.businessBaggage)
    })
    .then(flight => res.send(flight))
    .catch(err => res.status(400).send('Error: ' + err));

    //TODO notify passengers via email
    var userEmails=emails(id);
    var emailText = 'Hi!\n The flight with the following ID ' + id + ' has been updated. Please re-check the details of your reservation.';

    userEmails.forEach(element => {
      sendEmail(element, emailText);
    });

});


function sendEmail(email, emailText){
  let userEmail = email;
  
  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: userEmail,
    subject: 'Reservation Canceled',
    text: emailText
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

function verifyJWT(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token ==null) 
    return res.sendStatus(401);
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if (err)
         return res.sendStatus(403);
        if(!user.isAdmin)
          return res.json({message: 'Access denied. Admins only are allowed.'});
        if(req.cookies.jwt !== token)
          return res.json({message: "Please log in to continue."});
        req.user = user
        req.token = token
        next()
    })
}
  module.exports = router;
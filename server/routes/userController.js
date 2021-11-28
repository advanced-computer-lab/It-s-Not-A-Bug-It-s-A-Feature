const Reservation = require('../models/Reservation');
var router = require('express').Router();
let Flights = require('../models/Flights.js');
let User = require('../models/User.js');
var ObjectID = require('mongodb').ObjectID;

var loggedIn = true;

// TODO: this variable is to be filled when the user logs in
var curUserId = null;

// for sending emails
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

// see reservations made by the current user only.
router.route('/myReservations').get((req,res)=>{
  if(!loggedIn){ // TODO: should be directed to login page
    res.status(200).send("Hello Guest User!");
  }
  else{
    Reservation.find({userID: curUserId})
    .then(reserv => res.send(reserv))
    .catch(err => res.status(400).send('Error: ' + err));
  }
})

// (Req. 24) Get summary of the selected reservation
router.route('/myReservations/:id').get((req, res) => {
  var resID = req.params.id;
  Reservation.find({reservationID: resID})
  .then(reserv => res.send(reserv))
  .catch(err => res.status(400).send('Error: ' + err));
});

// cancel reservation made by user. The reservation is deleted from the database
// TODO: increment the value of available seats in the flight
router.route('/cancelReservation/:id').get((req,res)=>{
  if(!loggedIn) // TODO: should be directed to login page
    res.status(200).send("Hello Guest User!");
  else{
    var id = req.params.id;

    // check first if the reservation date is within 48 hours or less. If yes, don't cancel.
    // get the reservation
    var reservation = Reservations.findbyId(id).then().catch(err => res.status(404).json({ error: 'No such reservation!' }));

    // then get the departure flight by using its ID in the fetched reservation
    var flightId = Flights.findbyId(reservation.select('deptFlight')).then().catch(err => res.status(404).json({ error: 'No such flight!' }));
    // get departure date of the flight
    var deptDate = flightId.get('departureDate')
    var now = new Date();
    var days = (deptDate.getTime() - now.getTime()) / (1000*3600*24); // calculate difference in days.
    if(days <= 2){
      res.status(401).send(`Cannot cancel reservation because less than 48 hours are left.`);
      return;
    }

    console.log(`Deleting reservation ID ${id}`);
    Reservations.findByIdAndRemove(id, req.body)
    .then((result)=>{
      res.send(`Done! Reservation ${id} is successfully deleted.`);

      // email user with the canceled reservation details + the refunded amount
      // use the 'result' parameter in the then part.
      var own = User.findById(curUserId)
      sendEmail(own, result);
    })
    .catch(err => res.status(404).json({ error: 'No such reservation!' }));
  }
})

module.exports = router;
function dateQuery(date,type){  
  var result=JSON.parse('{}');
  var date1=new Date(date.substring(0,10)+"T00:00:00.000Z");
  var date2= new Date(date1.getTime() + (24 * 60 * 60 * 1000)); //24 hrs of the day
  result[type]= JSON.parse('{}');
  result[type]["$gte"]=new Date(date1);
  result[type]["$lt"]=new Date(date2);
  return result;
}
function seatQuery(adults,children,cabin){
  var cabinClass="currEconomySeats";
  if(cabin=='Business')//enum
      cabinClass="currBusinessSeats";
    var sum=adults;
    if(children!='') sum+=children;
    var seatQuery=JSON.parse('{}');
    seatQuery[cabinClass] = JSON.parse('{}');
    seatQuery[cabinClass]["$gte"]=sum;
    return seatQuery;
}

router.route('/searchFlights').get((req, res,next) => {
  var query =[];
  var rq=req.query;
  console.log(rq);
  //may add price range later

  if(rq.arrivalAirport != '')   query.push({arrivalAirport:new RegExp(rq.arrivalAirport,'i')});
  if(rq.departureAirport != '') query.push({departureAirport:new RegExp(rq.departureAirport,'i')});
  if(rq.arrivalTerminal != '')  query.push({arrivalTerminal:new RegExp(rq.arrivalTerminal,'i')});
  if(rq.departureTerminal != '')query.push({departureTerminal:new RegExp(rq.departureTerminal,'i')});
  if(rq.arrivalDate != '')      query.push(dateQuery(rq.arrivalDate,'arrivalDate'));
  if(rq.departureDate != '')    query.push(dateQuery(rq.departureDate,'departureDate'));
  if(rq.cabin != '' && rq.adultsNo != '') query.push(seatQuery(rq.adultsNo,rq.childrenNo,rq.cabin));

  //required cabin if no. of seats is mentioned
  //required adults if children are mentioned
    
  console.log(query);

  if(query.length>0)
      Flights.find({$and : query}, 'flightNo departureDate arrivalDate economySeats businessSeats arrivalAirport departureAirport departureTerminal arrivalTerminal').then( data => res.send(data));
});
//  SEARCH: number of passengers (children and adults), departure airport and arrival airport terminals, departure and arrival dates and cabin class. 

// req. 28: allow user to edit the profile information
// id = user ID
router.route('/editProfile/:id').get((req,res) => {
  User.findById(req.params.id)
  .then(user => res.send(user))
  .catch(err => res.status(400).send('Error: '+err));
});

// Post the updated profile information to the database
router.route('/editProfile/:id').get((req,res)=>{
  User.findByIdAndUpdate({ _id : req.params.id},{
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    passportNo: req.body.passportNo,
    email: req.body.email
  })
  .then(user => res.send(user))
  .catch(err => res.status(400).send('Error: ' + err));
});

function sendEmail(owner, reservation){
  let userEmail = owner.select('email');
  let name = owner.firstName
  let resID = reservation.select('reservationID');
  let price = reservation.select('price');

  let textmsg = 'Hi, ' + name + '!\n' + '\t Your reservation ' + resID +
   ' has been canceled. $' + price + ' has been refunded to your account.';

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: userEmail,
    subject: 'Reservation Canceled',
    text: textmsg
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

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
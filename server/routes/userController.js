const Reservation = require('../models/Reservation');
var router = require('express').Router();
var nodemailer = require('nodemailer');
let Flights = require('../models/Flights.js');
let User = require('../models/User.js');
var ObjectID = require('mongodb').ObjectID;
const { text } = require('express');
const { Flight } = require('@material-ui/icons');
// var loggedUserID=-1;
var loggedIn = true;

// TODO: this variable is to be filled when the user logs in
var curUserId = "61abf941d37940fe2e05d678";

// transporter for the refund email 
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
  Reservation.deleteMany({});
   Reservation.find()
     .then(reservation => res.send(reservation))
     .catch(err => res.status(400).send('Error: ' + err));
});

router.route('/res').post(async (req, res) => { //reserving a roundtrip .. 2 flightIDs should be passed from frontend 
  if (!loggedIn)
    res.status(200).send("Log in first"); //todo - redirect to login 
  else {
    console.log(req.body);
    const adultsNo = Number(req.body.adultsNo);
    const childrenNo = Number(req.body.childrenNo);
    const seatClass = req.body.seatClass;
    const deptFlight = req.body.deptFlight;//selected flight from frontend
    const arrFlight = req.body.arrFlight;//selected flight from frontend
    var deptSeats = [];
    var arrSeats = [];
    deptSeats.push(...req.body.deptSeats);
    arrSeats.push(...req.body.arrSeats);
    //update reservedSeats in dept and retuern fligthts
    await Flights.findByIdAndUpdate({ _id: (deptFlight) },
    {
      reservedSeats: deptSeats
    })
    // .then(flight => res.send(flight))
    // .catch(err => res.status(400).send('Error: ' + err));
    await Flights.findByIdAndUpdate({ _id: (arrFlight) },
    {
      reservedSeats: arrSeats
    })
    // .then(flight => res.send(flight))
    // .catch(err => res.status(400).send('Error: ' + err));

    const reservationID = Number(req.body.resID); //change, should not be input
    // const userID = ObjectID("61a41cc5c93682f2a06ea6dd"); //change to commented line below
   const userID = curUserId;  //userID of logged in user which is a global var saved in back end
    const passengers = adultsNo + childrenNo;

    var price = await calculatePrice(deptFlight, seatClass, passengers)
      + await calculatePrice(arrFlight, seatClass, passengers);


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
      .then(flight => oneSeat = flight.businessPrice) //syntax?
      .catch();
  }
  else {
    await Flights.findById(flightID)
      .then(flight => oneSeat = flight.economyPrice)
      .catch();
  }
  return oneSeat * seats;
}

// see reservations made by the current user only.
// returns reservation details + departure and return flight details
router.route('/myReservations').get(async (req,res)=>{
  if(!loggedIn){ // TODO: should be directed to login page
    res.status(200).send("Hello Guest User!");
  }
  else{
    console.log(`userID: ${curUserId}`);
    var userRes =[];
    await Reservation.find({userID: curUserId})
    .then(async (allUserReservations) => {
      for(let i = 0; i < allUserReservations.length; i++){
        reserv = allUserReservations[i];
        var resDeptFlight;
        await Flights.findById(ObjectID(reserv['deptFlight'])).
        then(ans => resDeptFlight = ans)
        .catch(err => res.status(500).send(err));

        var resArrFlight;
        await Flights.findById(ObjectID(reserv['arrFlight']))
        .then(ans => resArrFlight = ans)
        .catch(err => res.status(500).send(err));

        oneReservation = {reservation: reserv, deptFlight: resDeptFlight, arrFlight: resArrFlight};
        // console.log(`index ${idx}`);
        userRes.push(oneReservation);
        if(i === allUserReservations.length-1)
          res.send(userRes);
      }
    })
    .catch(err => res.status(400).send('Error: ' + err));
  }
})

// (Req. 24) Get summary of the selected reservation
// Given reservation ID, returns all its details + both its flights details
router.route('/myReservations/:id').get((req, res) => {
  var resID = req.params.id;
  var userRes;
  Reservation.find({_id: resID})
  .then(async (reserv) => {
    // console.log(reserv[0]);
    reserv = reserv[0];
    var resDeptFlight;
    await Flights.findById(ObjectID(reserv['deptFlight'])).
    then(ans => resDeptFlight = ans)
    .catch(err => res.status(500).send(err));

    var resArrFlight;
    await Flights.findById(ObjectID(reserv['arrFlight']))
    .then(ans => resArrFlight = ans)
    .catch(err => res.status(500).send(err));

    userRes = {reservation: reserv, deptFlight: resDeptFlight, arrFlight: resArrFlight};
    res.send(userRes);
  })
  .catch(err => res.status(400).send('Error: ' + err));
});

// cancel reservation made by user. The reservation is deleted from the database
router.route('/cancelReservation/:id').post(async (req,res, next)=>{
  console.log("about to cancel reservation!!");
  if(!loggedIn) // TODO: should be directed to login page
    res.status(200).send("Hello Guest User!");
  else{
    var id = req.params.id;
    // check first if the reservation date is within 48 hours or less. If yes, don't cancel.
    // get the reservation
    // var ans = cancelRes(id);
    cancelRes(id)
    .then(()=>res.send('Reservation canceled'))
    .catch(err => res.status(400).send(err));  
    

    // res.status(200).send('TODO: FIX THIS MESSAGE');
    // if(ans=="error")
    //   res.status(200).send(`error: can't cancel reservation`);
    // else
    //   res.status(200).send(`Reservation canceled successfully`);

  }
}
 );

async function cancelRes(id){
  var reservation;
    await Reservation.findById(id).then(res=>reservation=res).catch(err => console.log('error: No such reservation!'));
    console.log(`Reservation = ${reservation}`)
    console.log(`dept flight = ${reservation['deptFlight']}`);

    // then get the departure flight by using its ID in the fetched reservation
    var depDate;
    await Flights.findById(reservation['deptFlight'] ,{'departureDate':1,_id:0})
    .then((dd)=>{
      console.log(`dd = ${dd}`);
      depDate=dd;
    })
    .catch(err => res.status(404).json({ error: 'No such flight!' }));
    // get departure date of the flight
    console.log(`depdate = ${depDate}`);
    depDate=depDate['departureDate'];
    var now = new Date();
    var days = (depDate.getTime() - now.getTime()) / (1000*3600*24); // calculate difference in days.
    if(days <= 2){
      console.log('Cannot cancel reservation because less than 48 hours are left.');
      return "error";
    }
    // console.log(`Escaped Error`);
    console.log(`Deleting reservation ID ${id}`);
    Reservation.findByIdAndRemove(id/*, req.body*/)
    .then((req,res)=>{
      console.log(`Done! Reservation ${id} is successfully deleted.`);

      // increment available seats in both dep and arr flights 
      //  delete reserved seats in both flights
      updateFlightSeats(reservation, 'deptFlight');
      updateFlightSeats(reservation, 'arrFlight');
    })
    .catch((err,req,res,next) =>{ 
      console.error(err);
      res.status(404).json({ error: 'No such reservation!' })
  });

      // email user with the canceled reservation details + the refunded amount
      // use the 'result' parameter in the then part.
      var own;
      await User.findById(curUserId).then(result => own=result).catch(err => console.error(err));
      console.log(`owner = ${own}`);
      var textmsg = 'Hi, ' + own['firstName'] + '!\n' + '\t Your reservation ' + reservation['reservationID'] +
        ' has been canceled. $' + reservation['price'] + ' has been refunded to your account.';
      sendEmail(own,textmsg);
    return "done";
  }

// this function  deletes reserved seats in both flights, increments the available seats in the dept and
// arrival flights of a reservation.
// `whichFlight` field indicates whether the flight is dept or arr
async function updateFlightSeats(reservation, whichFlight){
  // get ID of dep flight
  var flightID = reservation[whichFlight];
  // fetch the flight from the DB
  var reservedFlight;
  await Flights.findById(flightID).then(result => reservedFlight = result).catch(err => console.log(err));

  // 1. fetch reservation seats
  // 2. fetch flight reserved seats
  // 3. delete common seats
  // 4. push changes
  var reservationSeats;
  if(whichFlight === 'deptFlight')
    reservationSeats = reservation['deptSeats'];
  else
    reservationSeats = reservation['arrSeats'];
  console.log(`reservation seats = ${reservationSeats}`);

  let flightSeats = reservedFlight['reservedSeats'];
  console.log(`reserved flight seats = ${flightSeats}`);

  reservationSeats.forEach(seat => {
    const index = flightSeats.indexOf(seat); // get position of seat
    if(index > -1)
      flightSeats.splice(index,1); // delete from array
  });
  console.log(`reserved flight seats = ${flightSeats}`);
  // pushing changes happens in the end of this function

  // create variable with the new no. of available seats
  var numSeats = reservation['adultsNo'] + reservation['childrenNo'];
  
  // post updates to database
  // if economy, add to economy, else add to business
  if(reservation['seatClass'] == 'Business')
    await Flights.findByIdAndUpdate({_id: flightID}, {
      currBusinessSeats: reservedFlight['currBusinessSeats']+numSeats,
      reservedSeats: flightSeats
    }).then(/*flight => res.send(flight)*/)
    .catch(err => res.status(400).send('Error: ' + err));

  else if(reservation['seatClass'] == 'Economy')
    await Flights.findByIdAndUpdate({_id: flightID}, {
      currEconomySeats: reservedFlight['currEconomySeats']+numSeats,
      reservedSeats: flightSeats
    }).then(/* flight => res.send(flight) */)
    .catch(err => res.status(400).send('Error: ' + err));

    //updating arr of reserved seats
    // const seatsToRemove = reservation['deptSeats']
    // // const seatsToRemove = reservation['arrSeats'] //todo - return flight
    // Flights.findByIdAndUpdate({_id: flightID}, {
    //   reservedSeats: reservedFlight['reservedSeats'].filter.(item => !(seatsToRemove.includes(item)))
    // }).then(flight => res.send(flight))
    // .catch(err => res.status(400).send('Error: ' + err));
}

// req. 28: allow user to edit the profile information
// id = user ID
router.route('/editProfile').get(async (req,res) => {
  await User.findById(curUserId)
  .then(user => res.send(user))
  .catch(err => res.status(400).send('Error: '+err));
});

// Post the updated profile information to the database
router.route('/editProfile').post(async (req,res)=>{
  await User.findByIdAndUpdate({ _id : curUserId},{
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    passportNo: req.body.passportNo,
    email: req.body.email
  })
  .then(user => res.send(user))
  .catch(err => res.status(400).send('Error: ' + err));
});

router.route('/getMaxResID').get(async (req,res)=>{
  var maxID = -1;
  let allRes;
  await Reservation.find()
     .then(reservation => {
       allRes=reservation;
       allRes.forEach(element => {
        if(element['reservationID'] > maxID)
          maxID = element['reservationID'];
        });
        console.log(`Max ID = ${maxID}`);
        res.status(200).send(`${maxID}`);
      })
     .catch(err => res.status(400).send('Error: ' + err));
  
});

function sendEmail(owner, emailText){
  let userEmail = owner['email'];
  
  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: userEmail,
    subject: 'Reservation Canceled',
    text: emailText
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.error("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

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
  console.log(adults);
  var cabinClass="currEconomySeats";
  if(cabin==="Business")//enum
      cabinClass="currBusinessSeats";
    var sum=parseInt(adults);
    if(children!=='') sum=parseInt(sum)+parseInt(children);
    console.log(sum);
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

  if(rq.arrivalAirport !== '')   query.push({arrivalAirport:new RegExp(rq.arrivalAirport,'i')});
  if(rq.departureAirport !== '') query.push({departureAirport:new RegExp(rq.departureAirport,'i')});

   if(rq.departureDate !== '')    query.push(dateQuery(rq.departureDate,'departureDate'));
   if(rq.cabin !== '' && rq.adultsNo !== '') query.push(seatQuery(rq.adultsNo,rq.childrenNo,rq.cabin));

  //required cabin if no. of seats is mentioned
  //required adults if children are mentioned
    
  console.log("query "+query);
  anded={$and : query};
  if(query.length>0)
      Flights.find(anded, 'flightNo departureDate arrivalDate economySeats businessSeats arrivalAirport departureAirport departureTerminal arrivalTerminal currBusinessSeats currEconomySeats businessPrice economyPrice economyBaggage businessBaggage reservedSeats').then( data => res.send(data));
});


router.route('/createUser').post((req,res,next)=>{
  console.log(req.body);
  console.log("abt to create new user");
  const firstName = req.body.firstName;
  const lastName = req.body.lastName; 
  const address = req.body.address; 
  const countryCode = Number(req.body.countryCode); 
  const phoneNo = Number(req.body.phoneNo); 
  const age = Number(req.body.age); 
  const username = req.body.username; 
  const password = req.body.password; 
  const nationality = req.body.nationality; 
  const email = req.body.email;
  const creditCardNo =Number(req.body.creditCardNo);
  const passportNo = (req.body.passportNo); 
  const isAdmin = Boolean(req.body.isAdmin); 
  const newUser = new User({firstName,lastName,address,countryCode,phoneNo,age,username,password,nationality,email,creditCardNo,passportNo,isAdmin});

  newUser.save()
  .then(()=>res.send('User Added'))
  .catch(err => res.status(400).send('Error: '+err));  
});
//  SEARCH: number of passengers (children and adults), departure airport and arrival airport terminals, departure and arrival dates and cabin class. 

//http://localhost:8000/user/res
// the request body:
// {
//   "resID":"8",
// "adultsNo": "2",
// "childrenNo":"2",
// "seatClass":"Economy",
// "deptFlight": "61ab490249533a817ec5565e",
// "arrFlight":"61ab49e7b8a5d445caa7e84e",
//  "deptSeats":[1,3,4,5],
// "arrSeats" :[3,16,19,22]

// }
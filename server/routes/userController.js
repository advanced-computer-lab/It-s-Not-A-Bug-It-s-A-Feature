const Reservation = require('../models/Reservation');
var router = require('express').Router();
let Flights = require('../models/Flights.js');
let User = require('../models/User.js');
var ObjectID = require('mongodb').ObjectID;
var loggedUserID=-1;
var loggedIn = true;

// TODO: this variable is to be filled when the user logs in
var curUserId = null;

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
    const reservationID = Number(req.body.resID); //change, should not be input
    const userID = ObjectID("61a41cc5c93682f2a06ea6dd"); //change to commented line below
   // const userID = loggedUserID;  userID of logged in user which is a global var saved in back end
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
 
router.route('/cancelReservation/:id').post((req,res)=>{
  console.log("about to cancel reservation!!");
  if(!loggedIn) // TODO: should be directed to login page
    res.status(200).send("Hello Guest User!");
  else{
    var id = req.params.id;
    // check first if the reservation date is within 48 hours or less. If yes, don't cancel.
    // get the reservation
    cancelRes(id);
  }
}
 );

async function cancelRes(id){
  var reservation;
    await Reservation.findById(id).then(res=>reservation=res).catch(err => console.log('error: No such reservation!'));
    console.log(reservation);
    console.log(reservation['deptFlight']);

    // then get the departure flight by using its ID in the fetched reservation
    var depDate;
    await Flights.findById(reservation['deptFlight'],{'departureDate':1,_id:0}).then(dd=>depDate=dd).catch(err => res.status(404).json({ error: 'No such flight!' }));
    // get departure date of the flight
    console.log(depDate);
    depDate=depDate['departureDate'];
    var now = new Date();
    var days = (depDate.getTime() - now.getTime()) / (1000*3600*24); // calculate difference in days.
    if(days <= 2){
      console.log('Cannot cancel reservation because less than 48 hours are left.');
      return;
    }

    console.log(`Deleting reservation ID ${id}`);
    Reservation.findByIdAndRemove(id, req.body)
    //need to increment seat no. in both dep and arr flights 
    .then((result)=>{
      res.send(`Done! Reservation ${id} is successfully deleted.`);

      // TODO: email user with the canceled reservation details + the refunded amount
      // use the 'result' parameter in the then part.

    })
    .catch(err => res.status(404).json({ error: 'No such reservation!' }));
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
//   "resID":"7",
// "adultsNo": "2",
// "childrenNo":"2",
// "seatClass":"Economy",
// "deptFlight": "61a3b4fad3b416f71f8ba8ce",
// "arrFlight":"61a3b642d3b416f71f8ba8f2",
//  "deptSeats":[1,3,4,5],
// "arrSeats" :[3,16,19,22]

// }
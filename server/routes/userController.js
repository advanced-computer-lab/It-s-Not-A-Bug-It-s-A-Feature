const Reservation = require('../models/Reservation');
var router = require('express').Router();
var nodemailer = require('nodemailer');
let Flights = require('../models/Flights.js');
let User = require('../models/User.js');
var ObjectID = require('mongodb').ObjectID;
const { text } = require('express');
const { Flight } = require('@material-ui/icons');
var send = true;

// authentication
const dotenv = require('dotenv')
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//payment
const stripe = require('stripe')(process.env.STRIPE_SECRET);
// const uuid = require('uuid/v4');

// this variable is to be filled when the user logs in
// var curUserId;
let tokens = [];

var editmsg;

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
    },
    tls: {
        rejectUnauthorized: false
    }
});

router.route('/').get((req, res) => {
    // if (!curUserId)
    //   res.status(200).send("Hello Guest User!");
    // else
    //   res.status(200).send("Hello Logged in User!");
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

router.route('/res').post(verifyJWT, async (req, res) => { //reserving a roundtrip .. 2 flightIDs should be passed from frontend 
    await payment(req, res)
    console.log("Body ", req.body);
    addRes(req)
        .then((a) =>
            console.log(a)
            // (msg)=>res.json({ message:msg})
        )
        .catch(
            err => console.log(err)
            // err => res.json({ message:err})
        );

});

// 1. add reserved seats to already existing flight seats
// 2. add reserved seats only to new reservation

async function addRes(req) {
    console.log('\nAdding new reservation...');
    const adultsNo = Number(req.body.adultsNo);
    const childrenNo = Number(req.body.childrenNo);
    const seatClass = req.body.seatClass;
    const deptFlight = req.body.deptFlight;//selected flight from frontend
    const arrFlight = req.body.arrFlight;//selected flight from frontend
    var deptSeats;
    var arrSeats;
    // deptSeats.push(...req.body.deptSeats);
    // arrSeats.push(...req.body.arrSeats);

    // TODO: get dept and arr flights' reserved seats
    await Flights.findById(deptFlight)
        .then((flight) => {
            console.log(flight.reservedSeats);
            deptSeats = flight.reservedSeats
        })
        .catch(err => console.log(err));

    await Flights.findById(arrFlight)
        .then(async (flight) => arrSeats = flight.reservedSeats)
        .catch(err => console.log(err));
    let resDeptSeats = req.body.deptSeats;
    let resDeptSeats2 = [];
    let resArrSeats = req.body.arrSeats;
    let resArrSeats2 = [];
    console.log(resDeptSeats)
    var n = "";
    for (var i = 0; i < resDeptSeats.length; i++) {
        if (resDeptSeats[i] === ',') {
            deptSeats.push(Number(n));
            resDeptSeats2.push(Number(n));
            n = "";
        }
        else {
            n += resDeptSeats[i];
        }
    }
    deptSeats.push(Number(n));
    resDeptSeats2.push(Number(n));
    n = "";
    for (var i = 0; i < resArrSeats.length; i++) {
        if (resArrSeats[i] === ',') {
            arrSeats.push(Number(n));
            resArrSeats2.push(Number(n));
            n = "";
        }
        else {
            n += resArrSeats[i];
        }
    }
    arrSeats.push(Number(n));

    resArrSeats2.push(Number(n));
    // deptSeats.push();
    // arrSeats.push([...req.body.arrSeats]);

    // calculate price, then proceed to payment before changing any
    // entries in the database.
    const passengers = adultsNo + childrenNo;
    var price = await calculatePrice(deptFlight, seatClass, passengers)
        + await calculatePrice(arrFlight, seatClass, passengers);

    //update reservedSeats in dept and return fligthts
    if (seatClass === 'Business') {
        await Flights.findByIdAndUpdate({ _id: (deptFlight) },
            {
                $inc: { currBusinessSeats: -resDeptSeats2.length },
                reservedSeats: deptSeats
            })
    }
    else {
        await Flights.findByIdAndUpdate({ _id: (deptFlight) },
            {
                $inc: { currEconomySeats: -resDeptSeats2.length },
                reservedSeats: deptSeats
            })
    }

    if (seatClass === 'Business') {
        await Flights.findByIdAndUpdate({ _id: (arrFlight) },
            {
                $inc: { currBusinessSeats: -resArrSeats2.length },
                reservedSeats: deptSeats
            })
    }
    else {
        await Flights.findByIdAndUpdate({ _id: (arrFlight) },
            {
                $inc: { currEconomySeats: -resArrSeats2.length },
                reservedSeats: deptSeats
            })
    }

    const reservationID = Number(req.body.resID); //change, should not be input
    // const userID = ObjectID("61a41cc5c93682f2a06ea6dd"); //change to commented line below
    const userID = req.user.id;  //userID of logged in user which is a global var saved in back end


    const newRes = new Reservation({
        reservationID: reservationID,
        userID: userID,
        adultsNo: adultsNo,
        childrenNo: childrenNo,
        seatClass: seatClass,
        deptFlight: deptFlight,
        arrFlight: arrFlight,
        deptSeats: resDeptSeats2,
        arrSeats: resArrSeats2,
        price: price,
    });
    console.log("resArrivalSeats", newRes.arrSeats, " entered:", resArrSeats);
    // payment
    newRes.save()
        .then()
        .catch(err => console.error(err));

    return 'Reservation added successfully.';
}


async function calculatePrice(flightID, seatClass, seats) {
    var oneSeat;
    if (seatClass == 'Business') {
        await Flights.findById(flightID)
            .then(flight => oneSeat = flight.businessPrice)
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
router.route('/myReservations').get(verifyJWT, async (req, res) => {
    console.log(`userID: ${req.user.id}`);
    var userRes = [];
    await Reservation.find({ userID: req.user.id })
        .then(async (allUserReservations) => {
            for (let i = 0; i < allUserReservations.length; i++) {
                reserv = allUserReservations[i];
                var resDeptFlight;
                await Flights.findById(ObjectID(reserv['deptFlight'])).
                    then(ans => resDeptFlight = ans)
                    .catch(err => res.status(500).send(err));

                var resArrFlight;
                await Flights.findById(ObjectID(reserv['arrFlight']))
                    .then(ans => resArrFlight = ans)
                    .catch(err => res.status(500).send(err));

                oneReservation = { reservation: reserv, deptFlight: resDeptFlight, arrFlight: resArrFlight };
                // console.log(`index ${idx}`);
                userRes.push(oneReservation);
                if (i === allUserReservations.length - 1)
                    res.send(userRes);
            }
            if (allUserReservations.length == 0)
                res.send([]);
        })
        .catch(err => res.status(400).send('Error: ' + err));

})

// (Req. 24) Get summary of the selected reservation
// Given reservation ID, returns all its details + both its flights details
router.route('/myReservations/:id').get(verifyJWT, (req, res) => {
    var resID = req.params.id;
    var userRes;
    Reservation.find({ _id: resID })
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

            userRes = { reservation: reserv, deptFlight: resDeptFlight, arrFlight: resArrFlight };
            res.send(userRes);
        })
        .catch(err => res.status(400).send('Error: ' + err));
});

// cancel reservation made by user. The reservation is deleted from the database
router.route('/cancelReservation/:id').post(verifyJWT, async (req, res, next) => {
    console.log("about to cancel reservation!!");

    var id = req.params.id;
    // check first if the reservation date is within 48 hours or less. If yes, don't cancel.
    // get the reservation
    cancelRes(id)
        .then((msg) => res.send(msg))
        .catch(err => res.status(400).send(err));

});

async function cancelRes(id) {
    var reservation;
    await Reservation.findById(id).then(res => reservation = res).catch(err => console.log('error: No such reservation!'));
    if (!reservation) {
        editmsg = "Reservation not found.";
        return "Reservation not found.";
    }
    console.log(`Reservation = ${reservation}`)
    console.log(`dept flight = ${reservation['deptFlight']}`);

    // then get the departure flight by using its ID in the fetched reservation
    var depDate;
    await Flights.findById(reservation['deptFlight'], { 'departureDate': 1, _id: 0 })
        .then((dd) => {
            console.log(`dd = ${dd}`);
            depDate = dd;
        })
        .catch(err => res.status(404).json({ error: 'No such flight!' }));
    // get departure date of the flight
    console.log(`depdate = ${depDate}`);
    depDate = depDate['departureDate'];
    var now = new Date();
    var days = (depDate.getTime() - now.getTime()) / (1000 * 3600 * 24); // calculate difference in days.
    if (days <= 2) {
        editmsg = 'Cannot cancel reservation because less than 48 hours are left.'; // this is relevant only to edit reservation
        console.log('Cannot cancel reservation because less than 48 hours are left.');
        return 'Cannot cancel reservation because less than 48 hours are left.';
    }
    // console.log(`Escaped Error`);
    console.log(`Deleting reservation ID ${id}`);
    Reservation.findByIdAndRemove(id/*, req.body*/)
        .then((req, res) => {
            console.log(`Done! Reservation ${id} is successfully deleted.`);

            // increment available seats in both dep and arr flights 
            //  delete reserved seats in both flights
            updateFlightSeats(reservation, 'deptFlight');
            updateFlightSeats(reservation, 'arrFlight');
        })
        .catch((err, req, res, next) => {
            console.error(err);
            res.status(404).json({ error: 'No such reservation!' })
        });

    // email user with the canceled reservation details + the refunded amount
    // use the 'result' parameter in the then part.
    if (send) {
        var own;
        await User.findById(req.user.id).then(result => own = result).catch(err => console.error(err));
        console.log(`owner = ${own}`);
        var textmsg = 'Hi, ' + own['firstName'] + '!\n' + '\t Your reservation ' + reservation['reservationID'] +
            ' has been canceled. $' + reservation['price'] + ' has been refunded to your account.';
            console.log(textmsg);
        sendEmail(own, textmsg, 'Reservation Cancelled Successfully');
    }
    return "done";
}

// this function  deletes reserved seats in both flights, increments the available seats in the dept and
// arrival flights of a reservation.
// `whichFlight` field indicates whether the flight is dept or arr
async function updateFlightSeats(reservation, whichFlight) { //called in canceling res to delete seats & increment available seats
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
    if (whichFlight === 'deptFlight')
        reservationSeats = reservation['deptSeats'];
    else
        reservationSeats = reservation['arrSeats'];
    console.log(`reservation seats = ${reservationSeats}`);

    let flightSeats = reservedFlight['reservedSeats'];
    console.log(`reserved flight seats = ${flightSeats}`);

    reservationSeats.forEach(seat => {
        const index = flightSeats.indexOf(seat); // get position of seat
        if (index > -1)
            flightSeats.splice(index, 1); // delete from array
    });
    console.log(`reserved flight seats = ${flightSeats}`);
    // pushing changes happens in the end of this function

    // create variable with the new no. of available seats
    var numSeats = reservation['adultsNo'] + reservation['childrenNo'];

    // post updates to database
    // if economy, add to economy, else add to business
    if (reservation['seatClass'] == 'Business')
        await Flights.findByIdAndUpdate({ _id: flightID }, {
            currBusinessSeats: reservedFlight['currBusinessSeats'] + numSeats,
            reservedSeats: flightSeats
        }).then(/*flight => res.send(flight)*/)
            .catch(err => res.status(400).send('Error: ' + err));

    else if (reservation['seatClass'] == 'Economy')
        await Flights.findByIdAndUpdate({ _id: flightID }, {
            currEconomySeats: reservedFlight['currEconomySeats'] + numSeats,
            reservedSeats: flightSeats
        }).then(/* flight => res.send(flight) */)
            .catch(err => res.status(400).send('Error: ' + err));
}

// req. 28: allow user to edit the profile information
// id = user ID
router.route('/editProfile').get(verifyJWT, async (req, res) => {
    await User.findById(req.user.id)
        .then(user => res.send(user))
        .catch(err => res.status(400).send('Error: ' + err));
});

// Post the updated profile information to the database
router.route('/editProfile').post(verifyJWT, async (req, res) => {
    await User.findByIdAndUpdate({ _id: req.user.id }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        passportNo: req.body.passportNo,
        email: req.body.email
    })
        .then(user => res.send(user))
        .catch(err => res.status(400).send('Error: ' + err));
});

router.route('/getMaxResID').get(async (req, res) => {
    var maxID = -1;
    let allRes;
    await Reservation.find()
        .then(reservation => {
            allRes = reservation;
            allRes.forEach(element => {
                if (element['reservationID'] > maxID)
                    maxID = element['reservationID'];
            });
            console.log(`Max ID = ${maxID}`);
            res.status(200).send(`${maxID}`);
        })
        .catch(err => res.status(400).send('Error: ' + err));

});

function sendEmail(owner, emailText, sub) {
    let userEmail = owner['email'];
//     let userEmail = 'basant_allam@hotmail.com';
    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: userEmail,
        subject: sub,
        text: emailText
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.error("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });
}


function dateQuery(date, type) {
    var result = JSON.parse('{}');
    var date1 = new Date(date.substring(0, 10) + "T00:00:00.000Z");
    var date2 = new Date(date1.getTime() + (24 * 60 * 60 * 1000)); //24 hrs of the day
    result[type] = JSON.parse('{}');
    result[type]["$gte"] = new Date(date1);
    result[type]["$lt"] = new Date(date2);
    return result;
}
function seatQuery(adults, children, cabin) {
    console.log(adults);
    var cabinClass = "currEconomySeats";
    if (cabin === "Business")//enum
        cabinClass = "currBusinessSeats";
    var sum = parseInt(adults);
    if (children !== '') sum = parseInt(sum) + parseInt(children);
    console.log(sum);
    var seatQuery = JSON.parse('{}');
    seatQuery[cabinClass] = JSON.parse('{}');
    seatQuery[cabinClass]["$gte"] = sum;
    return seatQuery;
}

function validAirport(airport){
    var res='';
    for (let i = 0; i < airport.length; i++) {
        if(airport[i]=='(')break;
        res += airport[i];
        
    }
    return res;
}

router.route('/searchFlights').get((req, res, next) => {
    var query = [];
    var rq = req.query;
    console.log(rq);
    //may add price range later

    const validArrAirport =validAirport(rq.arrivalAirport);
    const validDeptAirport =validAirport(rq.departureAirport);

    if (rq.arrivalAirport !== '') query.push({ arrivalAirport: new RegExp(validArrAirport, 'i') });
    if (rq.departureAirport !== '') query.push({ departureAirport: new RegExp(validDeptAirport, 'i') });

    if (rq.departureDate !== '') query.push(dateQuery(rq.departureDate, 'departureDate'));
    if (rq.cabin !== '' && rq.adultsNo !== '') query.push(seatQuery(rq.adultsNo, rq.childrenNo, rq.cabin));

    //required cabin if no. of seats is mentioned
    //required adults if children are mentioned

    console.log("query " + query);
    anded = { $and: query };
    if (query.length > 0)
        Flights.find(anded, 'flightNo departureDate arrivalDate economySeats businessSeats arrivalAirport departureAirport departureTerminal arrivalTerminal currBusinessSeats currEconomySeats businessPrice economyPrice economyBaggage businessBaggage reservedSeats').then(data => res.send(data));
});


router.route('/createUser').post((req, res, next) => {
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
    const creditCardNo = Number(req.body.creditCardNo);
    const passportNo = (req.body.passportNo);
    const isAdmin = Boolean(req.body.isAdmin);
    const newUser = new User({ firstName, lastName, address, countryCode, phoneNo, age, username, password, nationality, email, creditCardNo, passportNo, isAdmin });

    newUser.save()
        .then(() => res.send('User Added'))
        .catch(err => res.status(400).send('Error: ' + err));
});

router.route('/findAlternativeFlights').get((req, res, next) => { //takes parameters reservationID  & flightID & user's intended date & cabin
    var rq = req.query; //searches for flights other than the reserved one to replace it with

    res.status(400).send(findOtherFlights(rq.flightID, rq.reservationID, rq.date, rq.cabin));
});

router.route('/changeSeats').post((req, res, next) => {
    var rq = req.body;
    res.status(400).send(changeSeats(rq.newSeats, rq.reservationID, rq.whichFlight));
});

async function changeSeats(newSeats, reservationID, whichFlight) {
    //if newSeats is already input as a Number array, we won't need the next line
    // newSeats = newSeats.split(',').map(function (item) { return parseInt(item, 10); });

    await Reservation.findById(reservationID).then(reserv => r = reserv);
    console.log("ressss idddd", reservationID, r);
    var flightID = r[whichFlight];

    await Flights.findById(flightID).then(flight => f = flight);

    var oldSeats;

    if (whichFlight === 'deptFlight') {
        oldSeats = r['deptSeats'];
        var myquery = { _id: reservationID };
        var newvalues = { $set: { 'deptSeats': newSeats } };

        await Reservation.updateOne(myquery, newvalues);
    }
    else if (whichFlight === 'arrFlight') {
        oldSeats = r['arrSeats'];
        var myquery = { _id: reservationID };
        var newvalues = { $set: { 'arrSeats': newSeats } };
        await Reservation.updateOne(myquery, newvalues);
    }
    var reservedSeats = f['reservedSeats'];
    reservedSeats = reservedSeats.filter(x => !oldSeats.includes(x));
    reservedSeats = reservedSeats.concat(newSeats);
    reservedSeats = reservedSeats.filter(function (elem, pos) {
        return reservedSeats.indexOf(elem) == pos;
    })

    var myquery = { _id: flightID };
    var newvalues = { $set: { 'reservedSeats': reservedSeats } };
    await Flights.updateOne(myquery, newvalues);
    //DO WE NEED TO EMAIL THE USER WITH CHANGED SEATS??
}


async function findOtherFlights(flightID, reservationID, date, cabin) {
    var r; var f;

    await Reservation.findById(reservationID).then(reserv => r = reserv);
    await Flights.findById(flightID).then(flight => f = flight);

    query = [];
    console.log(date);
    adultsNo = r.adultsNo;
    childrenNo = r.childrenNo;
    from = f.departureAirport;
    to = f.arrivalAirport;

    query.push({ '_id': { $ne: new ObjectID(flightID) } });
    query.push(seatQuery(adultsNo, childrenNo, cabin));
    query.push(dateQuery(date, 'departureDate'));
    query.push({ 'departureAirport': from });
    query.push({ 'arrivalAirport': to });

    anded = { $and: query };
    sum = Number(adultsNo) + Number(childrenNo);

    if (query.length > 0)
        Flights.find(anded, 'flightNo departureDate arrivalDate arrivalAirport departureAirport').then(data => { console.log(data); return priceDiff(flightID, data, sum, cabin) });
}

async function priceDiff(currFlight, flights, sum, cabin) {
    price = await calculatePrice(currFlight, cabin, sum);
    for (let i = 0; i < flights.length; i++) {
        currFlight = flights[i];
        currPrice = await calculatePrice(currFlight['_id'], cabin, sum);

        diff = Number(currPrice) - Number(price)
        temp = { 'priceDifference': diff };
        duration = msToTime(currFlight['arrivalDate'] - currFlight['departureDate']);
        temp1 = { 'duration': duration };
        flights[i] = { ...currFlight._doc, ...temp, ...temp1 };
        console.log(flights[i]);

    }
    // console.log(flights+'!!');
    return flights;
}
function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
//  SEARCH: number of passengers (children and adults), departure airport and arrival airport terminals, departure and arrival dates and cabin class. 

router.route("/register").post(async (req, res) => {
    const user = req.body;
    const takenUsername = await User.findOne({ username: user.username });
    const takenEmail = await User.findOne({ email: user.email });

    if (takenUsername || takenEmail) {
        res.json({ message: "Username or email has already been taken" });
    } else {
        user.password = await hashIt(req.body.password);
        const dbUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            countryCode: user.countryCode,
            phoneNo: user.phoneNo,
            phoneNoOptional: user.phoneNoOptional,
            birthDate: user.birthDate,
            nationality: user.nationality.toLowerCase(),
            creditCardNo: user.creditCardNo,
            passportNo: user.passportNo,
            isAdmin: false
        })

        dbUser.save();
        res.json({ message: "success" });
    }
});

router.route("/login").post((req, res) => {
    const userLoggingIn = req.body;
    User.findOne({ username: userLoggingIn.username })
        .then(async (dbUser) => {
            // console.log(dbUser);
            if (!dbUser) {
                return res.json({ message: "Invalid username" });
            }

            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            email: dbUser.email
                        }
                        console.log('it is correct');
                        // curUserId = dbUser._id;
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            { expiresIn: 86400 },
                            (err, token) => {
                                console.log("inside callback")
                                if (err) {
                                    console.log(err);
                                    return res.json({ message: err })
                                }
                                console.log('Success');
                                tokens.push(token);
                                return res.json({
                                    message: "success",
                                    token: "Bearer " + token
                                })
                            }
                        )
                    } else {
                        console.log('not correct');
                        return res.json({ message: "Invalid password" });
                    }

                })
        })
})

function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        if (req.cookies.jwt !== token) {
            console.log(req.cookies.jwt, token);
            return res.json({ message: "Please log in to continue." });

        }
        req.user = user
        req.token = token
        next()
    })
}

async function hashIt(password) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

router.route("/getUsername").get(verifyJWT, (req, res) => {
    console.log(req.user.id);
    res.json({ isLoggedIn: true, username: req.user._id })
})

router.route('/changePassword').post(verifyJWT, (req, res) => {

    const passwords = req.body;
    User.findOne({ _id: req.user.id })
        .then(async (dbUser) => {
            if (!dbUser) {
                return res.json({ message: "User not Found." });
            }
            let oldPass = passwords.old;
            console.log(oldPass);
            console.log(dbUser.password);
            bcrypt.compare(oldPass, dbUser.password)
                .then(async (isCorrect) => {
                    if (!isCorrect) {
                        return res.json({ message: "Old password does not match the current one." });
                    }
                    let newPass = passwords.new;
                    if (newPass === oldPass) {
                        return res.json({ message: "The new password must be different from the current one." });
                    }
                    newPass = await hashIt(newPass);
                    await User.findOneAndUpdate({ _id: req.user.id }, { password: newPass });
                    return res.json({ message: "Password updated successfully." });

                });


        })
});

router.route('/logout').delete(verifyJWT, (req, res) => {
    console.log(tokens);
    // discuss with frontend if they can pass token in req.body
    let idx = tokens.indexOf(req.token);
    console.log(idx);
    if (idx > -1)
        tokens.splice(idx, 1);
    console.log(tokens);
    return res.json({ message: "log out successful" });
})

router.route('/editReservation/:id').post(verifyJWT, async (req, res) => {
    var id = req.params.id;
    console.log("MY ID ", id);
    console.log('\nEditing reservation...\nAfter editing, the old reservation\'s price will\n' +
        'be refunded and you will proceed to pay the price of your \nreservation after editing.')
    send = false;
    editmsg = "Reservation edited successfully.";

    await cancelRes(id);
    if (editmsg === "Reservation edited successfully.") {
        await addRes(req);

        send = true;
        // sendItenrary(id, 'Reservation Edited Successfully');
    }
    return res.json({ message: editmsg });
})

router.route('/sendItenrary/:id').post(async (req, res) => {
    var resId = req.params.id;
    sendItenrary(resId, 'Reservation Details');

});

async function flightDetails(flightID) {
    var flight;
    await Flights.findById(flightID).then(res => flight = res).catch(err => console.log('error: No such flight!'));

    var text = "\n \n Flight Details: \n"
        + "Flight Number: " + flight['flightNo'] + '\n'
        + "Departure Date: " + flight['departureDate'] + '\n'
        + "Arrival Date: " + flight['arrivalDate'] + '\n'
        + "Arrival Airport: " + flight['arrivalAirport'] + '\n'
        + "Departure Airport: " + flight['departureAirport'] + '\n'
        + "Departure Terminal: " + flight['departureTerminal'] + '\n'
        + "Arrival Terminal: " + flight['arrivalTerminal'];
    //console.log(text);
    return text;

}

async function sendItenrary(resId, subject) {
    var reservation;
    var owner;
    console.log("resId hena", resId);
    await Reservation.findById(resId).then(async res => {
        console.log("fetched ress", res);
        await (reservation = res)
    })
        .catch(err => console.log('error: No such reservation!'));
    var userId = reservation['userID'];
    await User.findById(userId).then(result => owner = result).catch(err => console.error(err));

    var emailText = "Hi, " + owner['firstName'] + '!\n' +
        '\t Your Flight Itenerary Details are as follows!' + '\n' +
        "Reservation ID: " + reservation['reservationID'] + '\n' +
        "Number of Adults: " + reservation['adultsNo'] + '\n' +
        "Number of Children: " + reservation['childrenNo'] + '\n' +
        "Class:" + reservation['seatClass'] + '\n' +
        "Departure Flight: " + await flightDetails(reservation['arrFlight']) + '\n' +
        "Departure Seat(s): " + reservation['deptSeats'] + '\n' +

        "Arrival Flight: " + await flightDetails(reservation['deptFlight']) + '\n' +
        "Arrival Seat(s): " + reservation['arrSeats'] + '\n' +
        "Price: " + reservation['price'] + '\n' + '\n' + '\n' +
        "Wishing you a safe flight!" + '\n' +
        "OverReact Team :)";

    console.log(emailText);
    sendEmail(owner, emailText, subject);
}


module.exports = router;

async function payment(req, res) {
    try {
        const session = await stripe.checkout.session.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: "usd",
                    unit_amount: req.body.price * 100 // discuss with frontend
                }
            }],
            success_url: `${process.env.CLIENT_URL}/paySuccess`, // discuss client url with frontend
            cancel_url: `${process.env.CLIENT_URL}/payFail`
        })
        res.json({ url: session.url })
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}
router.route('/payment').post(verifyJWT, async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "airplane ticket",
                    },
                    unit_amount: req.body.price * 100 // discuss with frontend
                },
                quantity: 1
            }],
            success_url: `${process.env.CLIENT_URL}paySuccess`, // discuss client url with frontend
            cancel_url: `${process.env.CLIENT_URL}payFail`
        })
        res.json({ url: session.url })
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
})
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

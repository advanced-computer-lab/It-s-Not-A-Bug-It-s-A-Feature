
// External variables
//const postRoutes = require('./routes/post.js');
const express = require("express");
const mongoose = require('mongoose');
//var router = express.Router();
//const Router = require("./routes");
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});



//App variables
const app = express();
const port = process.env.PORT || "8000";
const MongoURI = process.env.ATLAS_URI;
var cors= require('cors');
var ReactDOM = require('react-dom')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));



const usersRouter = require('./routes/adminController.js');
app.use('/Admin', usersRouter);

const usersRouter2 = require('./routes/userController.js');
app.use('/user', usersRouter2);

const User = require('./models/User.js');
// #Importing the userController


//app.use(express.json()) // To parse the incoming requests with JSON payloads// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));




 app.get("/Home", (req, res) => {
    res.status(200).send("Hello World!");
  });

  app.get('/addAdmin', (req, res) => {
    //add admin to the db
    const newUser = new User({
      firstName: 'Aya',
      lastName: 'Elgamal',
      address: 'Cairo',
      countryCode:11587 ,
      phoneNo: 1005257603,
      age: 22,
      username:'aya.elgamal',
      password:'123',
      nationality:'Egyptian',
      email:'aya.elgamal',
      creditCardNo:123,
      passportNo: 12345,
      isAdmin:true
      
    })
    newUser.save(function(err,user){
      if(err){
        console.log(err);
      }
      else{
        res.status(200).send(user)
        console.log('Done!')
      }
    })
  });

  
  app.get('/addUser', (req, res) => { //just for now
    const newUser = new User({
      firstName: 'Eman',
      lastName: 'Osama',
      address: 'Cairo',
      countryCode:11587 ,
      phoneNo: 1005257777,
      age: 21,
      username:'eman123',
      password:'123',
      nationality:'Egyptian',
      email:'eman.osama',
      creditCardNo:1234,
      passportNo: 5678,
      isAdmin:false
      
    })
    newUser.save(function(err,user){
      if(err){
        console.log(err);
      }
      else{
        res.status(200).send(user)
        console.log('Done!')
      }
    })
  });
 
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });

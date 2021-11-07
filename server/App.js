
// External variables
//const postRoutes = require('./routes/post.js');
const express = require("express");
const mongoose = require('mongoose');
//var router = express.Router();
//const Router = require("./routes");
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});


//const userController = require('./Routes/userController');

//App variables
const app = express();
const port = process.env.PORT || "8000";
const MongoURI = process.env.ATLAS_URI;
var cors= require('cors');
var ReactDOM = require('react-dom')

app.use(cors())
app.use(express.json());

var cors= require('cors');
app.use(cors());
app.use(express.urlencoded({extended: false}));
var cors= require('cors');

app.use(cors());


const usersRouter = require('./routes/adminController.js');
app.use('/Admin', usersRouter);

//const User = require('./models/User');
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
      phoneNo: 01005257603,
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

 
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });

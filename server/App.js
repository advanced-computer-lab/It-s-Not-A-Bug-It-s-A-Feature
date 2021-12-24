
// External variables
//const postRoutes = require('./routes/post.js');
const express = require("express");
const mongoose = require('mongoose');
//var router = express.Router();
//const Router = require("./routes");
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});

const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//App variables
const app = express();
const port = process.env.PORT || "8000";
const MongoURI = process.env.ATLAS_URI;
var cors= require('cors');
var ReactDOM = require('react-dom')

//app.use(cors())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


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

app.post("/register", async (req,res)=>{
  const user = req.body;
  const takenUsername = await User.findOne({username: user.username});
  const takenEmail = await User.findOne({email: user.email});

  if(takenUsername || takenEmail){
    res.json({message: "Username or email has already been taken"});
  }else{
    user.password = await hashIt(req.body.password);
    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      countryCode:user.countryCode ,
      phoneNo: user.phoneNo,
      phoneNoOptional:user.phoneNoOptional,
      birthDate:user.birthDate,
      nationality:user.nationality.toLowerCase(),
      creditCardNo:user.creditCardNo,
      passportNo: user.passportNo,
      isAdmin:false
    })

    dbUser.save();
    res.json({message: "success"});
  }
});

async function hashIt(password){
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}


app.post("/login",async (req,res)=>{
  const userLoggingIn = req.body;
  User.findOne({username: userLoggingIn.username})
  .then(async (dbUser)=>{
    // console.log(dbUser);
    if(!dbUser){
      return res.json({message: "Invalid username"});
    }
    
    bcrypt.compare(userLoggingIn.password, dbUser.password)
    .then(isCorrect => {
      if(isCorrect){
        const payload = {
          id: dbUser._id,
          email: dbUser.email,
          isAdmin: dbUser.isAdmin
        }
        console.log('it is correct');
        // curUserId = dbUser._id;
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {expiresIn: 86400},
          (err, token) => {
            console.log("inside callback")
            if(err){
              console.log(err);
              return res.json({message: err})
            } 
            console.log('Success');
            // tokens.push(token);
            return res
            .cookie('jwt', token, {httpOnly: false, maxAge:86400})
            .json({
              message: "success",
              token: "Bearer " + token,
              isAdmin: payload.isAdmin
            })
            // res.cookie('jwt', token, { maxAge:86400});
            // console.log(res.cookie);
            // return res.json({
            //   message: "success",
            //   token: "Bearer " + token,
            //   isAdmin: payload.isAdmin
            // })
          }
        )
      }else{
        console.log('not correct');
        return res.json({message: "Invalid password"});
      }
      
    })
  })
})

app.delete('/logout', (req,res)=>{
  res.cookie('jwt', '', {maxAge: 1});
  res.json({message: 'logout successful'});
})

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

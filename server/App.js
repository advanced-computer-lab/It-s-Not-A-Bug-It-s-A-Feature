// External variables
const express = require("express");
const mongoose = require('mongoose');
//const Router = require("./routes")
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});

//const userController = require('./Routes/userController');

//App variables
const app = express();
const port = process.env.PORT || "8000";
const MongoURI = process.env.ATLAS_URI;

//const User = require('./models/User');
//const User = require('src/Models/User.js');
// #Importing the userController

app.use(express.json());
//app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


app.get("/Home", (req, res) => {
    res.status(200).send("Hello World!");
  });

// #Routing to usercontroller here

// app.post('/add-user', userController.addUser)
// app.get('/view-users',userController.viewUsers)
// app.get('/get-all-users/:name', userController.getUser)
// app.put('/update-user/:id',userController.updateUser)
// app.delete('/delete-user/:id',userController.deleteUser)                                    


// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });

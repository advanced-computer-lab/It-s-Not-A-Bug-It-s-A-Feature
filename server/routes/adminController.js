var router = require('express').Router();
//let adminController = require('./routes/adminController.js');
let User = require('../models/User.js');



router.route('/').get((req, res) => {
    res.status(200).send("Hello Admin!");
  });



  module.exports = router;

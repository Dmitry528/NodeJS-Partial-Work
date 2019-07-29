const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

const reg =(req, res, next)=>{
  let login = req.body.login;
  let password = req.body.password;
  let email = req.body.email;

  const UserSchema = require('../models/user.model');
  UserSchema.findOne({email: email})
  .then((email) => {
    if(!email){
      console.log('Email is free');
      UserSchema.findOne({login: login})
      .then((loginResult) => {
        if(!loginResult){
          console.log('Login is free'); 
          next(); 
        }
        else{
          console.log('Login is not free'); // Create User Error
          res.render('index', {msg: "Login is not free"}); // error UI
        }
      })
    }
    else{
      console.log('Email is not free'); // Create User Error
      res.render('index', {msg: "Email is not free"}); // error UI
    }
  })
}

const validation = (req, res, next) => {
  //console.log('In This Middleware i must create validation');
  let login = req.body.login;
  let password = req.body.password;
  let email = req.body.email;
  const UserSchema = require('../models/user.model')
  
  // Joi validate MongoSchema 
  // hash password
  // next save data into DB


  //next();
}


router.post('/', reg, validation ,(req, res) => { // auth = midleware 1) auth then / post
  
  console.log('Validation is okay, we are on \' / \' route ');
});

module.exports = router;

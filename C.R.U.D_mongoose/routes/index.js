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


   const UserSchema = require('../models/user.model');



  let CreateUser = new UserSchema({
    login: login,
    password: password,
    email: email
  });

  CreateUser.save((err, saved) => {
    if(err){
      //res.send({error: err.message});
      res.render('index', {msg: err.message});
    }
    else{
      console.log('Saved DATA INTO DB', saved);
      next();
    }
  })
  
  // Joi validate MongoSchema 
  // hash password
  // next save data into DB

  // try joigoose


}


router.post('/', reg, validation ,(req, res) => { // auth = midleware 1) auth then / post
  
  res.redirect('http://localhost:3000/users');
});

module.exports = router;

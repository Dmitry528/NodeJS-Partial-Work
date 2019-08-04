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
          console.log('Login is not free');
          res.render('index', {msg: "Login is not free"});
        }
      })
    }
    else{
      console.log('Email is not free');
      res.render('index', {msg: "Email is not free"});
    }
  })
}

const validation = (req, res, next) => {
  let login = req.body.login;
  let password = req.body.password;
  let email = req.body.email;

  bcrypt.hash(password, 10, (err, hash) => {
    if(err){
      console.log(err);
    }
    else{
       const UserSchema = require('../models/user.model');

      const CreateUser = new UserSchema({
        login: login,
        password: hash,
        email: email,
      });
      CreateUser.save((err, result) => {
        if(err){
          console.log(err);
        }
        else{
          console.log('Saved', result);
        }
      })
    }
  })
  
  // const UserSchema = require('../models/user.model');

  // const CreateUser = new UserSchema({
  //   login: login,
  //   password: password,
  //   email: email,
  // });

  // CreateUser.save((err, result) => {
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     console.log("Dava Saved" + result);
  //   }
  // })

}


router.post('/', reg, validation, (req, res) => { // auth = midleware 1) auth then / post
  res.redirect('http://localhost:3000/users');
});

module.exports = router;

// create auth
// create yours errors in Schema
// Pretty time in mongo
// hash min 8 is not working
// first validate Joi then write Schema then save into DB
// WATCH VIDEO MOTHERFUCKER
// When hash password (how before validation)
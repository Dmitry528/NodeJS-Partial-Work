const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

const reg =(req, res, next) => {
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

  //joi
  const JoiSchema = Joi.object().keys({
    login: Joi.string().alphanum().min(4).max(16).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).max(16),
    email: Joi.string().email()
  })
  const result = Joi.validate({
    login: login,
    password: password,
    email: email
  }, JoiSchema, (err, result) => {
    if(err){
      console.log(err);
      res.render('index', {msg: err.message});
    }
    else{
      console.log('Validate is okay' + result);
      next();
    }
  })
}


router.post('/', reg, validation, (req, res) => { // auth = midleware 1) auth then / post
  let login = req.body.login;
  let password = req.body.password;
  let email = req.body.email;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    else {
      const UserSchema = require('../models/user.model');

      const CreateUser = new UserSchema({
        login: login,
        password: hash,
        email: email,
      });
      CreateUser.save((err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Saved', result);
        }
      })
    }
  })
  res.redirect('http://localhost:3000/signIn');
});

module.exports = router;

// JWT TOKEN
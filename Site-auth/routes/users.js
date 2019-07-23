var express = require('express');
var router = express.Router();
var Joi = require('joi');
const passport = require('passport');

const User = require('../models/user');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const userSchema = Joi.object().keys({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
})

router.route('/register')
.get((req, res) => {
  res.render('register');
})
.post(async (req, res, next) => {
  try {
    const result = Joi.validate(req.body, userSchema)
    if(result.error){
      req.flash('error', 'Data entered is not valid. Please try again.');
      res.redirect('/users/register');
      return;
    }
    const user = await User.findOne({'email': result.value.email})
    if(user){
      req.flash('error', 'Email is alreader in use.')
      res.redirect('/users/register');
      return;
    }
    const hash = await User.hashPassword(result.value.password);

    delete result.value.confirmationPassword
    result.value.password = hash

    const newUser = await new User(result.value)
    await newUser.save()

    req.flash('success', 'Registration succesfully');
    res.redirect('/users/login');
  } 
  catch (error) {
    next(error);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({email: email})
  .then((result) => {
    if(password = result.password){
      req.flash('success', 'Enter success');
      res.redirect('/');
    }
  })
})

module.exports = router;

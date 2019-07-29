var express = require('express');
var router = express.Router();
var { check, validationResult } = require('express-validator'); // Use This variant

const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        Errors: error.msg,
      };
    }
  });

const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Login'
    })
});

router.post('/', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    // check('login').isEmpty(); // Use This variant
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    })
});

router.post('/register', async (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    let repassword = req.body.repassword;
    let email = req.body.email;

    try {
        const checkEmail = await User.findOne({email: email})
        if(checkEmail){
            // console.log('Email is already use');
            // return;
            res.render('register', {
                errors: 'Email is already used'
            });
            return;
        }
        const checkName = await User.findOne({login: login})
        if(checkName){
            //console.log('Login is already use'); // create error on flash
            //return; // redirect to this page
            res.render('register', {
                errors: 'Name is already used'
            });
            return;
        }
       await User.hashPassword(password)
        .then((hashPass) => {
            let createUser = new User({
                login: login,
                password: hashPass,
                email: email
            });
            createUser.save();
            console.log('Saved');
            res.redirect('/users');
        })
    } 
    catch (error) {
        res.render('/users/register', {
            errors: errors
        })
    }
});


module.exports = router;

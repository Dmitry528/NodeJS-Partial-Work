var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Login'
    })
});

router.post('/', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
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
            console.log('Email is already use');
            return;
        }
        const checkName = await User.findOne({login: login})
        if(checkName){
            console.log('Login is already use'); // create error on flash
            return; // redirect to this page
        }
       await bcrypt.hash(password, 10)
        .then((hashPass) => {
            let createUser = new User({
                login: login,
                password: hashPass,
                email: email
            });
            createUser.save();
            console.log('Saved');
        })
    } 
    catch (error) {
        
    }
});


module.exports = router;

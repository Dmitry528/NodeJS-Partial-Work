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

    //console.log(`Login: ${login}, Password: ${password}`);
    const UserSchema = require('../models/user');
    UserSchema.findOne({login: login})
    .then((user) => {
        return    bcrypt.compare(password, user.password)
    })
    .then((samePass) => {
        console.log(samePass);
        if(!samePass) {
            res.render('login', {
                errors: 'Incorrect login of password'
            });
        }
        res.redirect('http://localhost:3000/');
    })
    .catch((err) =>{
        console.log(err);
    })
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
    
    const UserSchema = require('../models/user')
    UserSchema.findOne({login: login})
    .then((result) => {
        return result;
    })
    .then((result) => {
        console.log(result);
    })


});


module.exports = router;

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
        if(!samePass) {
            res.send("Problem");
        }
        res.send('Its Okay');
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    })
});

router.post('/register', async (req, res) => {

    const UserSchema = require('../models/user');

    let login = req.body.login;
    let password = req.body.password;
    let repassword = req.body.repassword;
    let email = req.body.email;

    UserSchema.hashPassword(password)
    .then((hashingPassword) => {
        const CreateUser = new UserSchema({
            login: login,
            password: hashingPassword,
            email: email
        });
        CreateUser.save();
    })
    .then(() =>{
        res.redirect('/users');
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/');
    })
});


module.exports = router;

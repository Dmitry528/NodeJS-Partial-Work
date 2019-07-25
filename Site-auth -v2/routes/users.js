var express = require('express');
var router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Login'
    })
});

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

    if(password === repassword){
        const CreateUser = new UserSchema({
            login: login,
            password: password,
            email: email
        });
        CreateUser.save((err) => {
            if(err) {
                console.log(err);
            }
            else{
                res.redirect('/users');
                console.log("Saved");
            }
        })
    }
    else{
        res.render('register', {
            errors: "Something Wrong"
        });
    }

});


module.exports = router;

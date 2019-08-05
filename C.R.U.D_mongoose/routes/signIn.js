var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('signIn');
});

router.post('/', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    const UserShema = require('../models/user.model');
    UserShema.findOne({login: login})
    .then((result) => {
        if(!result){
            console.log('Not Found')
        }
        bcrypt.compare(password, result.password, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                if(result === false){
                    res.render('signIn');
                }
                else{
                    res.redirect('http://localhost:3000/users');
                }
            }
        })
    })
    .catch((err) => {
        console.log(err);
    })
})
module.exports = router;

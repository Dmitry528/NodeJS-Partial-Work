const joi = require('joi');

exports.register_page_get = (req, res) => {
    res.render('register', {
        title: 'Register'
    });
};

exports.validation = (req, res, next) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    const Schema = joi.object().keys({
        email: joi.string().email(),
        username: joi.string().alphanum().min(3).max(30).required(),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    });

    const resultValidate = Schema.validate({
        email: email,
        username: username,
        password: password
    }, (err, result) => {
        if(err){
           res.render('register', {
               title: 'Register',
               message: err.details[0].message
           });
        }
        else{
            console.log(`Joi valid is success`);
            next();
        }
    });
}

exports.checkDB = (req, res, next) => {
    console.log('We are on check DB');
    // check DB
    // if okay nextr and deside with messages
    //next();
    // res.render('register', {
    //     title: 'Register',
    //     linkRedirect: 'http://localhost:3000/signIn'
    // });
}

exports.register_page_post = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let repassword = req.body.repassword;
};
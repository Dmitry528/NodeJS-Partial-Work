exports.register_page_get = (req, res) => {
    res.render('register', {
        title: 'Register'
    });
};


exports.validation = (req, res, next) => {

    next();
}

exports.register_page_post = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let repassword = req.body.repassword;
};
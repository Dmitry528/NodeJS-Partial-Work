const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt');
const date = require('date-and-time');
const now = new Date();
const moment = date.format(now, 'ddd., MMM. DD YYYY');
console.log(moment);


const NewUser = new Schema({
    login: {
        required: true,
        minlength: 4,
        maxlength: 16,
        type: String
    },
    password: {
        required: true,
        //minlength: 4, Joi must do it
        //maxlength: 16, Joi must do it
        type: String
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: moment
    },
}, {
    versionKey: false
});

// NewUser.Hash = function(password){
//     return bcrypt.hash(password, bcrypt.genSalt(8), null);
// }


module.exports = mongoose.model('user', NewUser);








// const mongoose = require('mongoose');
// const Joigoose = require('joigoose')(mongoose);
// const Schema = mongoose.Schema;
// const Joi = require('joi');

// const joiUserSchema = Joi.object({
//     login: Joi.string().min(4).max(30).required(),
//     password: Joi.string().min(8).regex(/[a-zA-Z0-9]{3,30}/).required(),
//     email: Joi.string().email().required(),
//     created: Joi.date(),
// });

// var mongooseUserSchema = new mongoose.Schema(Joigoose.convert(joiUserSchema));

// module.exports = mongoose.model('user', mongooseUserSchema);
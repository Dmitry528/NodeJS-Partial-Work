const mongoose = require('mongoose');
const Joigoose = require('joigoose')(mongoose);
const Schema = mongoose.Schema;
const Joi = require('joi');

const joiUserSchema = Joi.object({
    login: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
    email: Joi.string().email().required(),
    created: Joi.date()
})

var mongooseUserSchema = new mongoose.Schema(Joigoose.convert(joiUserSchema));

module.exports = mongoose.model('user', mongooseUserSchema);


// const UserSchema = new Schema({
//     login: {
//         required: true,
//         type: String,
//         minlength: 4,
//         maxlength: 30
//     },
//     password: {
//         required: true,
//         type: String,
//         minlength: 8,
//         maxlength: 30
//     },
//     email: {
//         required: true,
//         type: String,
//     },
//     created: {
//         type: Date,
//         default: Date.now()
//     }
// });

// UserSchema.methods.joiValidate = (obj) => {
//     const schema = Joi.object().keys( {
//         login: Joi.string().min(4).max(30).required(),
//         password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
//         email: Joi.string().email().required(),
//         created: Joi.date()
//     })
//     return Joi.validate(obj, schema);
// }


//module.exports = mongoose.model('user', UserSchema);


// login: Joi.string().min(4).max(30).required(),
//         password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
// 		email: Joi.types.String().email().required(),
// 		created: Joi.types.Date(),
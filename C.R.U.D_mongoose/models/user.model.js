const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        required: true,
        type: String,
        minlength: 4,
        maxlength: 30
    },
    password: {
        required: true,
        type: String,
        minlength: 8,
        maxlength: 30
    },
    email: {
        required: true,
        type: String,
    },
    created: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('user', UserSchema);
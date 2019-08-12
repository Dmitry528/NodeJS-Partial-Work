const mongoouse = require('mongoose');
const Schema = mongoouse.Schema;

const UserSchema = new Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
}, {
    versionKey: false
});

module.exports = mongoouse.model('Register_Users', UserSchema);
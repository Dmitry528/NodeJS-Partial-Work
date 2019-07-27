const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const user = new schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', user);
module.exports.hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }
    catch (error){
        throw new Error('Hashing failed', error);
    }
}
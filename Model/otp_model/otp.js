const mongoose = require('mongoose');

const sch = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('vendor_otp', sch);
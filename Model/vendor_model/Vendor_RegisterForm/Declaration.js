const mongoose = require('mongoose');


const sch = new mongoose.Schema({
    vendor_id: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    accept_tc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('vendor_declaration', sch);
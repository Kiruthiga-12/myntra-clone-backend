const mongoose = require('mongoose');

const sch = new mongoose.Schema({
    vendor_id: {
        type: Number,
        required: true,
        unique: true
    },
    vendor_email: {
        type: String,
        required: true
    },
    vendor_status: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model('deleted_vendor_detail', sch);
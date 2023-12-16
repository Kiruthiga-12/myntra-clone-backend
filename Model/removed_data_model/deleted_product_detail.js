const mongoose = require('mongoose');

const sch = new mongoose.Schema({
    product_id: {
        type: Number,
        required: true,
        unique: true
    },
    vendor_email: {
        type: String,
        required: true
    },
    product_status: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model('deleted_product_detail', sch);
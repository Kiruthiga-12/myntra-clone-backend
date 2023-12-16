const mongoose = require('mongoose');


const sch = new mongoose.Schema({
    vendor_id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    brand_no: {
        type: String,
        required: true
    },
    brand_name: {
        type: String,
        required: true
    },
    brand_logo: {
        type: Buffer,
        required: true
    },
    nob: {
        type: String,
        required: true
    },
    yoe: {
        type: String,
        required: true
    },
    other_platforms:
    {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('vendor_brand_detail', sch);
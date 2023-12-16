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
    org_mail: {
        type: String,
        unique: true,
        required: true
    },
    primary_contact_name: {
        type: String,
        unique: true,
        required: true
    },
    primary_contact_mobile: {
        type: String,
        unique: true,
        required: true
    },
    primary_contact_email: {
        type: String,
        unique: true,
        required: true
    },
    bo_name: {
        type: String,
        unique: true,
        required: true
    },
    bo_number: {
        type: String,
        unique: true,
        required: true
    },
    bo_mail: {
        type: String,
        unique: true,
        required: true
    },
    exist_partner: {
        type: String,
        required: true
    },
    signature: {
        type: Buffer,
        required: true
    }
})

module.exports = mongoose.model('vendor_basic_contact', sch);
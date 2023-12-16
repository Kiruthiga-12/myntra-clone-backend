const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        vendor_id: {
            type: Number,
            required: true,
            unique: true
        },
        vendor_mobile: {
            type: Number,
            required: true,
            unique: true
        },
        company_mailid: {
            type: String,
            required: true,
            unique: true
        },
        vendor_firstname: {
            type: String,
            required: true,
            unique: true
        },
        vendor_lastname: {
            type: String,
            required: true,
            unique: true
        },
        vendor_password: {
            type: String,
            required: true,
            unique: true
        },
        vendor_profile: {
            type: Buffer
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('vendor_signup_detail', sch);
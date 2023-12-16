const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true,
            unique: true
        },
        user_mobile: {
            type: String,
            required: true,
            unique: true
        },
        user_password: {
            type: String,
            required: true,
            unique: true
        },
        user_gender: {
            type: String,
            required: true
        },
        user_fullname: {
            type: String,
            required: true,
            unique: true
        },
        user_mailid: {
            type: String,
            required: true,
            unique: true
        },
        user_alternate_mobile: {
            type: Number,
            required: true,
            unique: true
        },
        user_profile: {
            type: Buffer
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('user_signup_detail', sch);
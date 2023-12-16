const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        admin_email: {
            type: String,
            required: true,
            unique: true
        },
        admin_password: {
            type: String,
            required: true,
            unique: true
        },
        admin_id: {
            type: Number,
            required: true,
            unique: true
        },
        admin_profile: {
            type: Buffer
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('admin_signup_detail', sch);
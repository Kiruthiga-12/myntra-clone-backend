const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        loc: {
            type: String,
            required: true
        },
        alt_mob: {
            type: String,
            required: true
        },
        hint_name: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('admin_add_detail', sch);
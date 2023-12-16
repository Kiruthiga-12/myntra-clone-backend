const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true,
            unique: true
        },
        dob: {
            type: Date,
            required: true,
        },
        loc: {
            type: String,
            required: true,
        },
        hintname: {
            type: String,
            required: true
        }
    })

module.exports = mongoose.model('user_additional_detail', sch);
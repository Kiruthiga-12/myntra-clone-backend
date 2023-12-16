const mongoose = require('mongoose');

const sch = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        uninque: true
    },
    user_email: {
        type: String,
        unique: true,
        required: true
    },
    user_status: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model('deleted_user_detail', sch);
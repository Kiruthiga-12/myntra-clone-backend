const mongoose = require('mongoose');
const sch = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        receipient: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        sender: {
            type: String,
            required: true
        }
    })


module.exports = mongoose.model('user_gift_detail', sch);
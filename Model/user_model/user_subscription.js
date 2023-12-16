const mongoose = require('mongoose');
const sch = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        subscription: {
            type: String,
            required: true
        }
    })


module.exports = mongoose.model('user_subscription', sch);
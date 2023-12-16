const mongoose = require('mongoose');

const sch = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true
    },
    order_status: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    },
    cancelled_date: {
        type: Date,
        required: true
    },
    refund_amount: {
        type: Number,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    admin_id: {
        type: Number,
        required: true
    },
    admin_email: {
        type: String,
        required: true
    },
    refund_date: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model('user_refund', sch);
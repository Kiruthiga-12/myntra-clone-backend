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
    vendor_email: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    },
    delivered_date: {
        type: Date,
        required: true
    },
    product_id: {
        type: Number,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    comission: {
        type: Number,
        required: true
    },
    comission_amount: {
        type: Number,
        required: true
    },
    pay_amount: {
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
    paid_date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('vendor_payment', sch);
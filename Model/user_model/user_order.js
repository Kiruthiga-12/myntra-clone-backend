const mongoose = require('mongoose');
const sch = new mongoose.Schema(
    {
        order_id: {
            type: Number,
            required: true
        },
        payment_done: {
            type: String,
            required: true
        },
        payment_mode: {
            type: String,
            required: true
        },
        order_date: {
            type: Date,
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
        user_name: {
            type: String,
            required: true
        },
        vendor_email: {
            type: String,
            required: true
        },
        product_id: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        qty: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        strike_price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        image1: {
            type: [Buffer],
            required: true
        },
        del: {
            type: Date,
            required: true
        },
        transaction_id: {
            type: String,
            required: true
        },
        total_amount: {
            type: Number,
            required: true
        },
        discount_amount: {
            type: Number,
            required: true
        },
        conv_fee: {
            type: Number,
            required: true
        },
        gift_amt: {
            type: Number,
            required: true
        },
        total_items: {
            type: Number,
            required: true
        },
        total_mrp: {
            type: Number,
            required: true
        },
        first_order: {
            type: Number,
            required: true
        },
        addr: {
            type: String,
            required: true
        },
        town: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        packed_date: {
            type: Date
        },
        shipped_date: {
            type: Date
        },
        ofd_date: {
            type: Date
        },
        delivered_date: {
            type: Date
        },
        cancelled_date: {
            type: Date
        }
    }
)
module.exports = mongoose.model('user_order', sch);
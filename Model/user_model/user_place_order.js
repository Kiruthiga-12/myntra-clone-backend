const mongoose = require('mongoose');
const sch = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        user_email: {
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
        delivery: {
            type: Date,
            required: true
        }
    }
)
module.exports = mongoose.model('user_place_order', sch);
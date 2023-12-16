const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        product_id: {
            type: Number,
            required: true,
            unique: true
        },
        comp_name: {
            type: String,
            required: true
        },
        brand_name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        subcategory: {
            type: String,
            required: true
        },
        product: {
            type: String,
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
        price: {
            type: Number,
            required: true
        },
        color: {
            type: String,
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
        image1: {
            type: [Buffer],
            required: true
        },
        qty: {
            type: String,
            required: true
        },
        product_status: {
            type: String,
            required: true
        },
        product_keyword: {
            type: String,
            required: true
        },
        product_date: {
            type: Date,
            required: true
        },
        fabric: {
            type: String
        },
        pattern: {
            type: String
        },
        neck: {
            type: String
        },
        sleeve_length: {
            type: String
        },
        size_fit: {
            type: String
        },
        occasion: {
            type: String
        },
        main_trend: {
            type: String
        },
        wash_care: {
            type: String
        },
        closure: {
            type: String
        },
        complete_look:
        {
            type: String
        },
        count: {
            type: Number
        },
        rating: {
            type: Number
        },
        rating_count_user: {
            type: Number
        }
    }
)

module.exports = new mongoose.model('product_detail', sch);
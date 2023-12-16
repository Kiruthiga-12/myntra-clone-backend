const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        product_id: {
            type: Number,
            required: true,
            unique: true
        },
        category: {
            type: String
        },
        subcategory: {
            type: String
        },
        product: {
            type: String
        },
        image1: {
            type: [Buffer],
            required: true
        },
        brand_name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        product_date: {
            type: Date,
            required: true
        }
    }
)
module.exports = mongoose.model('cat_to_bag', sch);
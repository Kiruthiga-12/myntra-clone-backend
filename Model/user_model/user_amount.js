const mongoose = require('mongoose');
const sch = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        total_count: {
            type: Number,
            required: true
        },
        total_mrp: {
            type: Number,
            required: true
        },
        discount_mrp: {
            type: Number,
            required: true
        },
        convenience_fee: {
            type: Number,
            required: true
        },
        gift_amt: {
            type: Number,
            required: true
        },
        offer_amt: {
            type: Number,
            required: true
        },
        total_amount: {
            type: Number,
            required: true
        }
    }
)
module.exports = mongoose.model('user_amount', sch);
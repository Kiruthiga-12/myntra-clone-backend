const mongoose = require('mongoose');
const sch = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        user_name: {
            type: String,
            required: true
        },
        product_id: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comments: {
            type: String,
            required: true
        },
        commented_date: {
            type: Date,
            required: true
        }
    })


module.exports = mongoose.model('user_review_comment', sch);
const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        admin_id: {
            type: Number,
            required: true,
        },
        vendor_email: {
            type: String,
            required: true
        },
        vendor_id: {
            type: Number,
            required: true
        },
        product_status: {
            type: String,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        product_id: {
            type: Number,
            required: true
        }
    }
    , { timestamps: true }
)


module.exports = new mongoose.model('admin_product_approval', sch);
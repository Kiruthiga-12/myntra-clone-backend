const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        admin_id: {
            type: Number,
            required: true
        },
        vendor_id: {
            type: Number,
            required: true
        },
        vendor_email: {
            type: String,
            required: true
        },
        vendor_status: {
            type: String,
            required: true
        },
        reason: {
            type: String,
            required: true
        }
    }
    , { timestamps: true }
)


module.exports = new mongoose.model('admin_vendor_approval', sch);
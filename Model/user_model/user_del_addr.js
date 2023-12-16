const mongoose = require('mongoose');
const sch = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        mobile_no: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
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
        adr_type: {
            type: String,
            required: true
        },
        adr_id: {
            type: Number,
            required: true
        }
    }
)
module.exports = mongoose.model('user_del_addr', sch);
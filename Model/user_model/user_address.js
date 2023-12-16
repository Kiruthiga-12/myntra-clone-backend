const mongoose = require('mongoose');
const sch = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        name: {
            type: String
        },
        mobile_no: {
            type: String
        },
        pincode: {
            type: String
        },
        addr: {
            type: String
        },
        town: {
            type: String
        },
        adr_type: {
            type: String
        },
        adr_id: {
            type: Number
        }
    }
)
module.exports = mongoose.model('user_adr_detail', sch);
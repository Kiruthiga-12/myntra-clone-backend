const mongoose = require('mongoose');
const sch = new mongoose.Schema({
    vendor_id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    warehouse_no: {
        type: String,
        required: true
    },
    org_mailid: {
        type: String,
        required: true,
    },
    wh_city: {
        type: String,
        required: true
    },
    wh_state: {
        type: String,
        required: true
    },
    wh_country: {
        type: String,
        required: true
    },
    wh_address: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    wh_emailid: {
        type: String,
        required: true
    },
    wh_contactno: {
        type: String,
        required: true
    },
    perday: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('vendor_warehouse_detail', sch);
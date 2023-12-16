const mongoose = require('mongoose');
const sch = new mongoose.Schema({
    vendor_id: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gstin: {
        type: String,
        required: true,
        unique: true
    },
    reg_comp_name: {
        type: String,
        unique: true
    },
    pan_number: {
        type: String,
        unique: true
    },
    reg_city: {
        type: String
    },
    reg_pincode: {
        type: String
    },
    reg_adr: {
        type: String
    },
    reg_state: {
        type: String
    },
    reg_country: {
        type: String
    }
})

module.exports = mongoose.model('Vendor_GST_Detail', sch);
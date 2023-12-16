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
    account_name: {
        type: String,
        required: true
    },
    account_no:
    {
        type: String,
        required: true,
        unique: true
    },
    ifsc_code:
    {
        type: String,
        required: true
    },
    bank_name:
    {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('vendor_bank_detail', sch);
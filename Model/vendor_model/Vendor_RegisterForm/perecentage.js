const mongoose = require('mongoose');

const sch = new mongoose.Schema({
    vendor_id: {
        type: Number,
        required: true,
        unique: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    stepno: {
        type: String,
        required: true
    },
    perc: {
        type: Number
    }
})


module.exports = mongoose.model('vendor_perc_compl', sch);
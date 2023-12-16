const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        imgid: {
            type: Number,
            required: true
        },
        heading: {
            type: String,
            required: true
        },
        subheading: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        image1: {
            type: [Buffer],
            required: true
        }
    }
)
module.exports = mongoose.model('vendor_land', sch);
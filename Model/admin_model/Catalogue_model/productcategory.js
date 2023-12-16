const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        category: {
            type: String
        },
        subcategory: {
            type: String
        },
        productcategory: {
            type: String,
            unique: true
        }
    }
)

module.exports = mongoose.model('productcategory_list', sch);
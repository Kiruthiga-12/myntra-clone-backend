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
            type: String
        }
    }
)

module.exports = mongoose.model('productcategory_list', sch);
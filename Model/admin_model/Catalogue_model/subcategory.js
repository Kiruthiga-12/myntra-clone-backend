const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        category: {
            type: String
        },
        subcategory: {
            type: String
        }
    }
)

module.exports = mongoose.model('subcategory_list', sch);
const mongoose = require('mongoose');

const sch = new mongoose.Schema(
    {
        category: {
            type: String,
            unique: true
        }
    }
)

module.exports = mongoose.model('category_list', sch);
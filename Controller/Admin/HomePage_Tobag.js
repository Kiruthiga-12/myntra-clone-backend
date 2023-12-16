const category_to_bag = require('../../Model/admin_model/HomePage_model/categories_to_bag');
const product = require('../../Model/product_model/product');
const fs = require('fs');
//add cattobag 
exports.add_cattobag = (req, res) => {
    let fname = req.file.filename;
    category_to_bag.create({
        product_id: Number(req.body.product_id),
        brand_name: req.body.brand_name,
        description: req.body.description,
        product_date: req.body.product_date,
        category: req.body.category,
        subcategory: req.body.subcategory,
        product: req.body.product,
        image1: fs.readFileSync('uploads/category_list/' + fname)
    })
        .then((data) => {
            res.send({ "msg": 'success' })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//get cattobag list
exports.cattobag = (req, res) => {
    category_to_bag.find()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}
//count
exports.count = (req, res) => {
    category_to_bag.find().count()
        .then((data) => {
            res.send({ 'count': data })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//delete_all
exports.all = (req, res) => {
    category_to_bag.deleteMany()
        .then((data) =>
            res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete_single
exports.single = (req, res) => {
    category_to_bag.deleteOne({ product_id: Number(req.query.product_id) })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}
// ------------------------------------------------
//categories to bag, based on product date from high to low
exports.list = (req, res) => {
    product.find({ product_status: 'approved', count: { $gt: 0 } }).sort({ product_date: -1 })
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        "product_id": li.product_id,
                        "category": li.category,
                        "subcategory": li.subcategory,
                        "product": li.product,
                        "brand_name": li.brand_name,
                        "product_date": li.product_date,
                        "description": li.description,
                        "image": li.image1[0].toString('base64')
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}


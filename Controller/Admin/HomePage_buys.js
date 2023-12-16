const best_buys = require('../../Model/admin_model/HomePage_model/best_buys');
const product = require('../../Model/product_model/product');
const fs = require('fs');
//add best buys
exports.add_bestbuys = (req, res) => {
    let fname = req.file.filename;
    best_buys.create({
        product_id: Number(req.body.product_id),
        brand_name: req.body.brand_name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        subcategory: req.body.subcategory,
        product: req.body.product,
        image1: fs.readFileSync('uploads/bestbuys_list/' + fname)
    })
        .then((data) => {
            res.send({ "msg": 'success' })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//best buys, based on price data from low to high
exports.bestbuys = (req, res) => {
    product.find({ product_status: 'approved', count: { $gt: 0 } }).sort({ price: 1 })
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        "product_id": li.product_id,
                        "category": li.category,
                        "subcategory": li.subcategory,
                        "product": li.product,
                        "brand_name": li.brand_name,
                        "price": li.price,
                        "description": li.description,
                        "image": li.image1[0].toString('base64')
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}
//get best buys list
exports.buys_list = (req, res) => {
    best_buys.find()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}
//get best buys list count
exports.count = (req, res) => {
    best_buys.find().count()
        .then((data) => {
            res.send({ 'count': data })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//delete all best buys data
exports.delete_all = (req, res) => {
    best_buys.deleteMany()
        .then((data) =>
            res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete single product
exports.delete_single = (req, res) => {
    best_buys.deleteOne({ product_id: Number(req.query.product_id) })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}
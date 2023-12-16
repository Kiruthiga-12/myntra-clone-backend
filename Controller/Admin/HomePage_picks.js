const top_pick = require('../../Model/admin_model/HomePage_model/top_picks');
const product = require('../../Model/product_model/product');
const fs = require('fs');
//add picks
exports.add_det = (req, res) => {
    let fname = req.file.filename;
    top_pick.create({
        product_id: Number(req.body.product_id),
        brand_name: req.body.brand_name,
        description: req.body.description,
        price: Number(req.body.price),
        rating: Number(req.body.rating),
        category: req.body.category,
        subcategory: req.body.subcategory,
        product: req.body.product,
        image1: fs.readFileSync('uploads/toppick_list/' + fname)
    })
        .then((data) => {
            res.send({ "msg": 'success' })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//top picks based on rating of product from high to low
exports.toppicks = (req, res) => {
    product.find({ product_status: 'approved', count: { $gt: 0 } }).sort({ rating: -1 })
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
                        "rating": li.rating,
                        "description": li.description,
                        "image": li.image1[0].toString('base64')
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get top pick list
exports.list = (req, res) => {
    top_pick.find()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get top pick  list count
exports.count = (req, res) => {
    top_pick.find().count()
        .then((data) => {
            res.send({ 'count': data })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//delete single product
exports.single = (req, res) => {
    top_pick.deleteOne({ product_id: Number(req.query.product_id) })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}
//delete all Top pick data
exports.all = (req, res) => {
    top_pick.deleteMany()
        .then((data) =>
            res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
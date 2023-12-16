const slider = require('../../Model/admin_model/HomePage_model/slider_image')
const product = require('../../Model/product_model/product');
const fs = require('fs');
//add slider
exports.add_slider = (req, res) => {
    let fname = req.file.filename;
    slider.create({
        product_id: Number(req.body.product_id),
        brand_name: req.body.brand_name,
        discount: Number(req.body.discount),
        category: req.body.category,
        subcategory: req.body.subcategory,
        product: req.body.product,
        image1: fs.readFileSync('uploads/slider_list/' + fname)
    })
        .then((data) => {
            res.send({ "msg": 'success' })
        })
        .catch((error) => res.json({ Error: error.message }))
}
// Home Page Slider Products
exports.slider_all = (req, res) => {
    product.find({ product_status: 'approved', count: { $gt: 0 } }).sort({ product_id: -1 })
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        "product_id": li.product_id,
                        "category": li.category,
                        "subcategory": li.subcategory,
                        "product": li.product,
                        "brand_name": li.brand_name,
                        "discount": li.discount,
                        "image": li.image1[0].toString('base64')
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}
//get slider list
exports.slider = (req, res) => {
    slider.find()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}
//slider image
exports.slider_image = (req, res) => {
    slider.find()
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        "category": li.category,
                        "subcategory": li.subcategory,
                        "product": li.product,
                        "discount": li.discount,
                        "image": li.image1,
                        "brand_name": li.brand_name
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}
//count
exports.count = (req, res) => {
    slider.find().count()
        .then((data) => {
            res.send({ 'count': data })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//delete all
exports.all = (req, res) => {
    slider.deleteMany()
        .then((data) =>
            res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete single
exports.single = (req, res) => {
    slider.deleteOne({ product_id: Number(req.query.product_id) })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}
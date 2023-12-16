const deal = require('../../Model/admin_model/HomePage_model/deal_of_the_day');
const product = require('../../Model/product_model/product');
const fs = require('fs');
//add deal
exports.add_deal = (req, res) => {
    let fname = req.file.filename;
    deal.create({
        product_id: Number(req.body.product_id),
        brand_name: req.body.brand_name,
        description: req.body.description,
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        category: req.body.category,
        subcategory: req.body.subcategory,
        product: req.body.product,
        image1: fs.readFileSync('uploads/deal_list/' + fname)
    })
        .then((data) => {
            res.send({ "msg": 'success' })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//deal of the day , based on discount from high to low
exports.get_deal = (req, res) => {
    product.find({ product_status: 'approved', count: { $gt: 0 } }).sort({ discount: -1 })
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
                        "discount": li.discount,
                        "description": li.description,
                        "image": li.image1[0].toString('base64')
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get deal list 
exports.dl_list = (req, res) => {
    deal.find()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}
//get deal list count
exports.deal_count = (req, res) => {
    deal.find().count()
        .then((data) => {
            res.send({ 'count': data })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//delete all deal of the day data
exports.deal_delete_all = (req, res) => {
    deal.deleteMany()
        .then((data) =>
            res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//delete single product
exports.deal_delete_single = (req, res) => {
    deal.deleteOne({ product_id: Number(req.query.product_id) })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}
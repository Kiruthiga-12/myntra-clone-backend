const place_order = require('../../Model/user_model/user_place_order');
const fs = require('fs');
//add order 
exports.add_placeorder = (req, res) => {
    let fname = req.file.filename;
    place_order.create({
        user_id: Number(req.body.user_id),
        user_email: req.body.user_email,
        vendor_email: req.body.vendor_email,
        product_id: Number(req.body.pid),
        description: req.body.description,
        size: req.body.size,
        brand: req.body.brand,
        qty: req.body.qty,
        price: Number(req.body.price),
        strike_price: Number(req.body.strike_price),
        discount: Number(req.body.discount),
        count: Number(req.body.count),
        image1: fs.readFileSync('uploads/orderimg/' + fname),
        delivery: req.body.del
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get place order details.
exports.get_placeorder = (req, res) => {
    place_order.find({ user_id: Number(req.query.user_id) })
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        'user_id': li.user_id,
                        'user_email': li.user_email,
                        'vendor_email': li.vendor_email,
                        'product_id': li.product_id,
                        'description': li.description,
                        'size': li.size,
                        'brand': li.brand,
                        'qty': li.qty,
                        'price': li.price,
                        'strike_price': li.strike_price,
                        'discount': li.discount,
                        'delivery': li.delivery,
                        'count': li.count,
                        "image": li.image1[0].toString('base64')
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}
//delete place_order_ details
exports.delete_order = (req, res) => {
    place_order.deleteMany({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//update count i.e  item in stock in user place_order  model .
exports.upd_placeorder_itemstock = (req, res) => {
    if (req.query.increase != undefined && req.query.increase != '')
        place_order.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    else if (req.query.decrease != undefined && req.query.decrease != '') {
        place_order.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
    else if (req.query.zero != undefined && req.query.zero != '') {
        place_order.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
}
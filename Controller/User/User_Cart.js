const user_cart = require('../../Model/user_model/user_cart');
const fs = require('fs');
//add cart
exports.add_cart = (req, res) => {
    let fname = req.file.filename;
    user_cart.create(
        {
            user_id: Number(req.body.user_id),
            product_id: Number(req.body.product_id),
            vendor_email: req.body.vendor_email,
            brand_name: req.body.brand_name,
            description: req.body.description,
            comp_name: req.body.comp_name,
            size: req.body.size,
            qty: req.body.qty,
            price: req.body.price,
            strike_price: req.body.strike_price,
            discount: req.body.discount,
            count: Number(req.body.count),
            image1: fs.readFileSync('uploads/cart/' + fname)
        }
    )
        .then((data) => {
            res.send({ "msg": 'success' })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get Cart Details
exports.get_cart = (req, res) => {
    user_cart.find({ user_id: Number(req.query.user_id) })
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        'user_id': li.user_id,
                        'product_id': li.product_id,
                        'vendor_email': li.vendor_email,
                        'comp_name': li.comp_name,
                        'brand_name': li.brand_name,
                        'price': li.price,
                        'strike_price': li.strike_price,
                        'discount': li.discount,
                        'size': li.size,
                        'qty': li.qty,
                        'description': li.description,
                        'count': li.count,
                        "image": li.image1[0].toString('base64')
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get cart details based on user_id and product id 
exports.get_pid_userid = (req, res) => {
    user_cart.find({ user_id: Number(req.query.user_id), product_id: Number(req.query.product_id) })
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        'user_id': li.user_id,
                        'product_id': li.product_id
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get bag counts based on user_id
exports.count = (req, res) => {
    user_cart.find({ user_id: Number(req.query.user_id) }).count()
        .then((data) => {
            res.send({ 'data': data })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//delete cart
exports.delete_cart = (req, res) => {
    user_cart.deleteOne({ user_id: Number(req.query.user_id), product_id: Number(req.query.pid) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//delete all cart
exports.delete_all_cart = (req, res) => {
    user_cart.deleteMany({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//update count i.e  item in stock in cart model .
exports.cart_upd_itemstock = (req, res) => {
    if (req.query.increase != undefined && req.query.increase != '')
        user_cart.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    else if (req.query.decrease != undefined && req.query.decrease != '') {
        user_cart.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
    else if (req.query.zero != undefined && req.query.zero != '') {
        user_cart.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
}
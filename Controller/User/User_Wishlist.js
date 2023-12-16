const user_wishlist = require('../../Model/user_model/user_wishlist');
const fs = require('fs');
//add wishlist
exports.add_wishlist = (req, res) => {
    let fname = req.file.filename;
    user_wishlist.create({
        user_id: Number(req.body.user_id),
        vendor_email: req.body.vendor_email,
        product_id: Number(req.body.product_id),
        brand_name: req.body.brand_name,
        description: req.body.description,
        price: req.body.price,
        strike_price: req.body.strike_price,
        discount: req.body.discount,
        image1: fs.readFileSync('uploads/user_wish/' + fname),
        comp_name: req.body.comp_name,
        size: req.body.size,
        count: Number(req.body.count),
        qty: req.body.qty
    })
        .then((data) => {
            res.send({ "msg": 'success' })
        })
        .catch((error) =>
            res.json({ Error: error.message })
        )
}
//get wishlist based on user id
exports.wishlist_userid = (req, res) => {
    user_wishlist.find({ user_id: Number(req.query.user_id) })
        .then((data) => {
            res.send(data);
        })
        .catch((error) => res.json({ Error: error.message }))
}
//get wishlist based on user id and pid
exports.wishlist_userid_pid = (req, res) => {
    user_wishlist.find({ user_id: Number(req.query.user_id), product_id: Number(req.query.pid) })
        .then((data) => {
            if (data.length > 0)
                res.send({ 'msg': 'success' });
            else
                res.send({ 'msg': 'no data' })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get wishist for all users
exports.wishlist_all = (req, res) => {
    user_wishlist.find()
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get wishlist count user wise 
exports.wishlist_count = (req, res) => {
    user_wishlist.aggregate([{ $group: { _id: { $substr: ['$product_id', 0, 10] }, count: { $sum: 1 } } }])
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        'product_id': li._id,
                        'count': li.count
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}

//delete wishlist
exports.delete_wishlist = (req, res) => {
    user_wishlist.deleteOne({ product_id: Number(req.query.product_id) })
        .then(async (data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}

//update count i.e  item in stock in wishlist model .

exports.update_wishlist_itemstock = (req, res) => {
    if (req.query.increase != undefined && req.query.increase != '')
        user_wishlist.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    else if (req.query.decrease != undefined && req.query.decrease != '') {
        user_wishlist.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
    else if (req.query.zero != undefined && req.query.zero != '') {
        user_wishlist.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
}

//delete all prod 
exports.delete_all = (req, res) => {
    user_wishlist.deleteMany({ user_id: req.query.user_id })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
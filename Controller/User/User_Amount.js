const user_amount = require('../../Model/user_model/user_amount');

//add details
exports.add_amount = (req, res) => {
    user_amount.create({
        user_id: Number(req.body.user_id),
        total_mrp: Number(req.body.total_mrp),
        discount_mrp: Number(req.body.discount_mrp),
        convenience_fee: Number(req.body.conv_fee),
        gift_amt: Number(req.body.gift_amt),
        total_amount: Number(req.body.total_amount),
        total_count: Number(req.body.total_count),
        offer_amt: Number(req.body.offer_amt)
    })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get amount details
exports.get_amount = (req, res) => {
    user_amount.find({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete amount details
exports.delete_amount = (req, res) => {
    user_amount.deleteMany({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
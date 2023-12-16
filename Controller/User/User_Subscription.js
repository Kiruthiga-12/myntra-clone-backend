const subscription = require('../../Model/user_model/user_subscription');

//subscription details.
exports.get_det = (req, res) => {
    subscription.find({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//add subscription
exports.add_sub = (req, res) => {
    subscription.create({
        user_id: Number(req.body.user_id),
        subscription: req.body.subscription
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete sub
exports.delete_sub = (req, res) => {
    subscription.updateOne({
        user_id: Number(req.query.user_id)
    }, {
        $set: {
            user_id: Number(req.body.user_id),
            subscription: req.body.subscription
        }
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//remove subscription
exports.remove_sub = (req, res) => {
    subscription.deleteOne({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
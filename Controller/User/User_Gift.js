const user_gift = require('../../Model/user_model/user_gift');

//add gift wrap
exports.add_gift = (req, res) => {
    user_gift.create({
        user_id: Number(req.body.user_id),
        receipient: req.body.receipient,
        message: req.body.message,
        sender: req.body.sender
    })
        .then((data) => {
            res.send({ 'data': data })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//edit gift wrap
exports.edit_gift = (req, res) => {
    user_gift.updateOne({ user_id: Number(req.query.user_id) }, {
        $set: {
            user_id: Number(req.body.user_id),
            receipient: req.body.receipient,
            message: req.body.message,
            sender: req.body.sender
        }
    })
        .then((data) => {
            res.send({ 'data': data })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//delete gift wrap
exports.delete_gift = (req, res) => {
    user_gift.deleteOne({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//get gift wrap
exports.get_gift = (req, res) => {
    user_gift.find({ user_id: Number(req.query.user_id) }).limit(1)
        .then((data) =>
            res.send(data)
        )
        .catch((error) => res.json({ Error: error.message }))
}
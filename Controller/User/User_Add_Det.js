const user_add_det = require('../../Model/user_model/user_additonal_details');
//delete
exports.delete_det = (req, res) => {
    user_add_det.deleteOne({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get add details
exports.get_det = (req, res) => {
    user_add_det.find({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
// add additional det:
exports.add_det = (req, res) => {
    user_add_det.create({
        user_id: Number(req.body.user_id),
        dob: req.body.dob,
        loc: req.body.loc,
        hintname: req.body.hint
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//edit add details
exports.edit_det = (req, res) => {
    user_add_det.updateOne({ user_id: req.query.user_id }, {
        $set: {
            user_id: Number(req.body.user_id),
            dob: req.body.dob,
            loc: req.body.loc,
            hintname: req.body.hint
        }
    }).then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
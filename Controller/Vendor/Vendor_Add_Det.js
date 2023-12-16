const vendor_add_det = require('../../Model/vendor_model/vendor_add_detail');

//add
exports.add_det = (req, res) => {
    vendor_add_det.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        loc: req.body.loc,
        alt_mob: req.body.alt_mob,
        hint_name: req.body.hint_name
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//edit
exports.edit_det = (req, res) => {
    vendor_add_det.updateOne({ email: req.query.email }, {
        $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile: req.body.mobile,
            email: req.body.email,
            gender: req.body.gender,
            dob: req.body.dob,
            loc: req.body.loc,
            alt_mob: req.body.alt_mob,
            hint_name: req.body.hint_name
        }
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get
exports.get_det = (req, res) => {
    vendor_add_det.find({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//delete
exports.delete_det = (req, res) => {
    vendor_add_det.deleteOne({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
const bank_detail = require('../../../Model/vendor_model/Vendor_RegisterForm/Bank_Details');

//add
exports.add_det = (req, res) => {
    bank_detail.create({
        vendor_id: Number(req.body.vendor_id),
        email: req.body.email,
        account_name: req.body.account_name,
        account_no: req.body.account_no,
        ifsc_code: req.body.ifsc_code,
        bank_name: req.body.bank_name,
        account_type: req.body.account_type
    }).
        then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//edit
exports.edit_det = (req, res) => {
    bank_detail.updateOne({ email: req.body.email }, {
        $set: {
            vendor_id: Number(req.body.vendor_id),
            email: req.body.email,
            account_name: req.body.account_name,
            account_no: req.body.account_no,
            ifsc_code: req.body.ifsc_code,
            bank_name: req.body.bank_name,
            account_type: req.body.account_type
        }
    }).
        then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get
exports.get_det = (req, res) => {
    const all = bank_detail.find();
    (req.query.email != undefined && req.query.email != '') ? all.find({ email: req.query.email }) : all;
    (req.query.vendor_id != undefined && req.query.vendor_id != '') ? all.find({ vendor_id: Number(req.query.vendor_id) }) : all;

    all.then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete
exports.delete_det = (req, res) => {
    bank_detail.deleteOne({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//delete
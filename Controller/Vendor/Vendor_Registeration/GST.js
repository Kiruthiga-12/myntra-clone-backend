const gst = require('../../../Model/vendor_model/Vendor_RegisterForm/GST');
//add
exports.add_gst = (req, res) => {
    gst.create({
        vendor_id: Number(req.body.vendor_id),
        email: req.body.email,
        gstin: req.body.reg_gstin,
        reg_comp_name: req.body.reg_comp_name,
        pan_number: req.body.pan_number,
        reg_city: req.body.reg_city,
        reg_pincode: req.body.reg_pincode,
        reg_adr: req.body.reg_adr,
        reg_state: req.body.reg_state,
        reg_country: req.body.reg_country
    }).
        then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//edit
exports.edit_gst = (req, res) => {
    gst.updateOne({ email: req.body.email }, {
        $set: {
            vendor_id: Number(req.body.vendor_id),
            email: req.body.email,
            gstin: req.body.reg_gstin,
            reg_comp_name: req.body.reg_comp_name,
            pan_number: req.body.pan_number,
            reg_city: req.body.reg_city,
            reg_pincode: req.body.reg_pincode,
            reg_adr: req.body.reg_adr,
            reg_state: req.body.reg_state,
            reg_country: req.body.reg_country
        }
    }).then((data) => {
        res.send(data)
    })
        .catch((error) => res.json({ Error: error.message }))
}
//get
exports.get_gst = (req, res) => {
    const all = gst.find();
    (req.query.email != undefined && req.query.email != '') ? all.find({ email: req.query.email }) : all;
    (req.query.vendor_id != undefined && req.query.vendor_id != '') ? all.find({ vendor_id: Number(req.query.vendor_id) }) : all;
    all.then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete
exports.delete_gst = (req, res) => {
    gst.deleteOne({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
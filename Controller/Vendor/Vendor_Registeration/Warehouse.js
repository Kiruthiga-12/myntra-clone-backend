const whouse_detail = require('../../../Model/vendor_model/Vendor_RegisterForm/Warehouse_Details');

//add
exports.add_wh = (req, res) => {
    whouse_detail.create({
        vendor_id: Number(req.body.vendor_id),
        email: req.body.email,
        warehouse_no: req.body.warehouse_no,
        org_mailid: req.body.org_mailid,
        wh_city: req.body.wh_city,
        wh_state: req.body.wh_state,
        wh_country: req.body.wh_country,
        wh_address: req.body.wh_address,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        wh_emailid: req.body.wh_emailid,
        wh_contactno: req.body.wh_contactno,
        perday: req.body.perday
    }).
        then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//edit
exports.edit_wh = (req, res) => {
    whouse_detail.updateOne({ email: req.body.email, warehouse_no: req.body.warehouse_no }, {
        $set: {
            vendor_id: Number(req.body.vendor_id),
            email: req.body.email,
            warehouse_no: req.body.warehouse_no,
            org_mailid: req.body.org_mailid,
            wh_city: req.body.wh_city,
            wh_state: req.body.wh_state,
            wh_country: req.body.wh_country,
            wh_address: req.body.wh_address,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            wh_emailid: req.body.wh_emailid,
            wh_contactno: req.body.wh_contactno,
            perday: req.body.perday
        }
    }).
        then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete
exports.delete_wh = (req, res) => {
    whouse_detail.deleteMany({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get
exports.get_det = (req, res) => {
    const all = whouse_detail.find();
    (req.query.email != undefined && req.query.email != '') ? all.find({ email: req.query.email }) : all;
    (req.query.vendor_id != undefined && req.query.vendor_id != '') ? all.find({ vendor_id: Number(req.query.vendor_id) }) : all;
    all.then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//warehouse no
exports.get_whno = (req, res) => {
    whouse_detail.find({ email: req.query.email, warehouse_no: req.query.warehouse_no })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
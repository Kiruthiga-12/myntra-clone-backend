const basic_contact = require('../../../Model/vendor_model/Vendor_RegisterForm/Basic_Contact');
const fs = require('fs');
// add basic contact
exports.add_basic_contact = (req, res) => {
    let fname = req.file.filename;
    basic_contact.create({
        vendor_id: Number(req.body.vendor_id),
        email: req.body.email,
        org_mail: req.body.orgmail,
        primary_contact_name: req.body.primary_name,
        primary_contact_mobile: req.body.primary_phone,
        primary_contact_email: req.body.primary_mail,
        bo_name: req.body.bo_name,
        bo_number: req.body.bo_mobile,
        bo_mail: req.body.bo_mail,
        exist_partner: req.body.exist_mp,
        signature: fs.readFileSync('uploads/signature/' + fname)
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//edit basic contact
exports.edit_basic_contact = (req, res) => {
    let fname = req.file.filename;
    basic_contact.updateOne({ email: req.body.email }, {
        $set: {
            vendor_id: Number(req.body.vendor_id),
            email: req.body.email,
            org_mail: req.body.org_mail,
            primary_contact_name: req.body.primary_contact_name,
            primary_contact_mobile: req.body.primary_contact_mobile,
            primary_contact_email: req.body.primary_contact_email,
            bo_name: req.body.bo_name,
            bo_number: req.body.bo_number,
            bo_mail: req.body.bo_mail,
            exist_partner: req.body.exist_partner,
            signature: fs.readFileSync('uploads/signature/' + fname)
        }
    }).
        then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get 
exports.get_det = (req, res) => {
    const all = basic_contact.find();
    (req.query.email != undefined && req.query.email != '') ? all.find({ email: req.query.email }) : all;
    (req.query.vendor_id != undefined && req.query.vendor_id != '') ? all.find({ vendor_id: Number(req.query.vendor_id) }) : all;

    all.then(async (data) => {
        if (data.length > 0) {
            let image = data[0].signature.toString('base64');
            res.send({
                "vendor_id": data[0].vendor_id,
                "email": data[0].email,
                "org_mail": data[0].org_mail,
                "primary_contact_name": data[0].primary_contact_name,
                "primary_contact_mobile": data[0].primary_contact_mobile,
                "primary_contact_email": data[0].primary_contact_email,
                "bo_name": data[0].bo_name,
                "bo_number": data[0].bo_number,
                "bo_mail": data[0].bo_mail,
                "exist_partner": data[0].exist_partner,
                "signature": image
            })
        }
        else {
            res.send([])
        }
    })
        .catch((error) => res.json({ Error: error.message }))
}
//delete
exports.delete = (req, res) => {
    basic_contact.deleteOne({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

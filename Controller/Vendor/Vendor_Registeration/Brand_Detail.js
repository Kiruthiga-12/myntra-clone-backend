const brand_detail = require('../../../Model/vendor_model/Vendor_RegisterForm/Brand_Details');
const fs = require('fs');
//add brand details
exports.add_brand = (req, res) => {
    let filename = req.file.filename;
    brand_detail.create({
        vendor_id: Number(req.body.vendor_id),
        email: req.body.email,
        brand_no: req.body.brand_no,
        brand_name: req.body.brand_name,
        nob: req.body.nob,
        yoe: req.body.yoe,
        other_platforms: req.body.other_platforms,
        brand_logo: fs.readFileSync('uploads/brand_logo/' + filename)
    }).then((data) => {
        res.send(data)
    })
        .catch((error) => res.json({ Error: error.message }))
}
//edit brand details
exports.edit_brand = (req, res) => {
    let filename = req.file.filename;
    brand_detail.updateOne({ email: req.body.email, brand_no: req.body.brand_no }, {
        $set: {
            vendor_id: Number(req.body.vendor_id),
            email: req.body.email,
            brand_no: req.body.brand_no,
            brand_name: req.body.brand_name,
            nob: req.body.nob,
            yoe: req.body.yoe,
            other_platforms: req.body.other_platforms,
            brand_logo: fs.readFileSync('uploads/brand_logo/' + filename)
        }
    }).
        then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get
exports.get_alldet = (req, res) => {
    const all = brand_detail.find();
    (req.query.email != undefined && req.query.email != '') ? all.find({ email: req.query.email }) : all;
    (req.query.vendor_id != undefined && req.query.vendor_id != '') ? all.find({ vendor_id: Number(req.query.vendor_id) }) : all;
    all.then((data) => {
        if (data.length > 0)
            res.send(data.map((li) => {
                return (
                    {
                        "vendor_id": li.vendor_id,
                        "email": li.email,
                        "brand_no": li.brand_no,
                        "brand_name": li.brand_name,
                        "brand_logo": li.brand_logo.toString('base64'),
                        "nob": li.nob,
                        "yoe": li.yoe,
                        "other_platforms": li.other_platforms
                    }
                )
            }))
        else
            res.send([])
    })
        .catch((error) => res.json({ Error: error.message }))
}

exports.get_email = (req, res) => {
    brand_detail.find({ email: req.query.email, brand_no: req.query.brand_no })
        .then((data) => {
            if (data.length > 0) {
                let image = data[0].brand_logo.toString('base64')
                res.send({
                    "vendor_id": data[0].vendor_id,
                    "email": data[0].email,
                    "brand_no": data[0].brand_no,
                    "brand_name": data[0].brand_name,
                    "brand_logo": image,
                    "nob": data[0].nob,
                    "yoe": data[0].yoe,
                    "other_platforms": data[0].other_platforms
                })
            }
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}
//edit

//delete
exports.delete_brand = (req, res) => {
    brand_detail.deleteMany({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
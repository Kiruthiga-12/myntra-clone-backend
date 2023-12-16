const vendor_landing = require('../../Model/admin_model/HomePage_model/vendor_land');
const product = require('../../Model/product_model/product');
const fs = require('fs');
//add images
exports.add_det = (req, res) => {
    let fname = req.file.filename;
    vendor_landing.create({
        imgid: Number(req.body.imgid),
        heading: req.body.heading,
        subheading: req.body.subheading,
        title: req.body.title,
        image1: fs.readFileSync('uploads/vendor_land/' + fname)
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//count
exports.count = (req, res) => {
    vendor_landing.find().count()
        .then((data) => res.json({ 'data': data }))
        .catch((error) => res.json({ Error: error.message }))
}

//get all vendor details.
exports.alldetails = (req, res) => {
    vendor_landing.find()
        .then(async (data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return (
                        {
                            "imgid": li.imgid,
                            "heading": li.heading,
                            "subheading": li.subheading,
                            "title": li.title,
                            "image1": li.image1
                        }
                    )
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}

//single
exports.single = (req, res) => {
    vendor_landing.deleteOne({ imgid: Number(req.query.imgid) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//all
exports.all = (req, res) => {
    vendor_landing.deleteMany()
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
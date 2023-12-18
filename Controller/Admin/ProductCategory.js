const productcategory = require('../../Model/admin_model/Catalogue_model/productcategory');
//add prod cat
exports.add_prodcat = (req, res) => {
    productcategory.create({
        category: req.body.catvalue,
        subcategory: req.body.subcatvalue,
        productcategory: req.body.productcatvalue
    }).then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//edit prodcat
exports.edit_prodcat = (req, res) => {
    productcategory.updateMany({ category: req.query.category }, {
        $set: {
            category: req.body.catvalue,
        }
    }).then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//delete prodcat
exports.delete_prodcat = (req, res) => {
    productcategory.deleteMany({ category: req.query.category })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//update subcat in product  table.
exports.upd_prodcat_subcat = (req, res) => {
    productcategory.updateMany({ category: req.query.category, subcategory: req.query.subcategory }, {
        $set: {
            category: req.body.catvalue,
            subcategory: req.body.subcatvalue
        }
    }).then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete subcat in product table.
exports.del_subcat_prodcat = (req, res) => {
    productcategory.deleteMany({ subcategory: req.query.subcategory })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//update product in product table
exports.edit_prodcat_prodcat = (req, res) => {

    productcategory.updateOne({ category: req.query.category, subcategory: req.query.subcategory, productcategory: req.query.product }, {
        $set: {
            category: req.body.catvalue,
            subcategory: req.body.subcatvalue,
            productcategory: req.body.productcatvalue
        }
    }).then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete
exports.delete_prodcat_prodcat = (req, res) => {
    productcategory.deleteOne({
        category: req.query.category, subcategory: req.query.subcategory,
        productcategory: req.query.product
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//get
exports.get_all = (req, res) => {
    productcategory.find()
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get cat,subcat
exports.get_cat_subcat = (req, res) => {
    productcategory.find({ category: req.query.category, subcategory: req.query.subcategory })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get cat 
exports.get_cat = (req, res) => {
    productcategory.find({ category: req.query.category })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//get prod cat
exports.get_prodcat = (req, res) => {
    productcategory.find({ productcategory: req.query.product })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//limit
exports.limit = (req, res) => {
    productcategory.find().limit(req.query.limit)
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
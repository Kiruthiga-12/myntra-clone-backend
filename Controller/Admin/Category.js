const category = require('../../Model/admin_model/Catalogue_model/category');
const subcategory = require('../../Model/admin_model/Catalogue_model/subcategory');

//add category
exports.add_category = (req, res) => {
    category.create({
        category: req.body.catvalue
    }).then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//update cat in CatgeoryTable:
exports.edit_category = (req, res) => {
    category.updateOne({ category: req.query.category }, {
        $set: {
            category: req.body.catvalue,
        }
    }).then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete category
exports.delete_category = (req, res) => {
    category.deleteOne({ category: req.query.category })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get category
exports.get_category = (req, res) => {
    category.find()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}
//get category based on cat
exports.get_cat = (req, res) => {
    category.find({ category: req.query.category })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//add subcat
exports.add_subcat = (req, res) => {
    subcategory.create({
        category: req.body.catvalue,
        subcategory: req.body.subcatvalue
    }).then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//edit subcat
exports.edit_subcat = (req, res) => {
    subcategory.updateMany({ category: req.query.category }, {
        $set: {
            category: req.body.catvalue,
        }
    }).then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//deleet categ in subcat
exports.delete_subcat = (req, res) => {
    subcategory.deleteMany({ category: req.query.category })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//update sub cat in subcat table
exports.upd_subcat = (req, res) => {
    subcategory.updateOne({ category: req.query.category, subcategory: req.query.subcategory }, {
        $set: {
            category: req.body.catvalue,
            subcategory: req.body.subcatvalue
        }
    }).then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//delete subcat in subcat
exports.remove_subcat = (req, res) => {
    subcategory.deleteOne({ subcategory: req.query.subcategory })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//get subcat
exports.get_subcat = (req, res) => {
    subcategory.find()
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get subcat based on cat
exports.subcat_cat = (req, res) => {
    subcategory.find({ category: req.query.category })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//get subcat based on subcat
exports.subcat_subcat = (req, res) => {
    subcategory.find({ subcategory: req.query.subcategory })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//subcat limit
exports.subcat_limit = (req, res) => {
    subcategory.find().limit(req.query.limit)
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
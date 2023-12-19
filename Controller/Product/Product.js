const product = require('../../Model/product_model/product');
const nodemailer = require('nodemailer');
const fs = require('fs');
//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})
//add product
exports.add_prod = (req, res) => {
    const product_message = {
        from: process.env.user_name,
        to: req.body.email,
        subject: `You have successfully submitted Product ID ${req.body.product_id}`,
        html: `Dear ${req.body.email} , 
        <br></br>
        <br></br>
        Product ID : ${req.body.product_id} has been submitted successfully. Please wait for Admin approval.
        After admin approval , product will be available for users
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team`
    }
    const product_admin = {
        from: process.env.user_name,
        to: process.env.user_name,
        subject: `Product Id ${req.body.product_id} has been released successfully`,
        html: ` Dear Admin Team ,  
        <br></br>
        Mr/Mrs. ${req.body.email} have successfully submitted Product Id ${req.body.product_id}. Kindly verify the details and approve the product.
        If there is any mismatch in details, Kindly mention the reason and reject the approval.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Automation Team `
    }
    product.create({
        email: req.body.email,
        product_id: Number(req.body.product_id),
        comp_name: req.body.comp_name,
        brand_name: req.body.brand_name,
        category: req.body.category,
        subcategory: req.body.sub_category,
        product: req.body.product,
        strike_price: Number(req.body.strike_price),
        discount: Number(req.body.discount),
        price: Number(req.body.price),
        color: req.body.color,
        description: req.body.description,
        size: req.body.size,
        image1: req.files.map((li) => fs.readFileSync(`uploads/images/${li.filename}`)),
        qty: req.body.qty,
        product_status: req.body.product_status,
        product_keyword: req.body.product_keyword,
        product_date: req.body.product_date,
        fabric: req.body.fabric,
        pattern: req.body.pattern,
        neck: req.body.neck,
        sleeve_length: req.body.sleeve_length,
        size_fit: req.body.size_fit,
        occasion: req.body.occasion,
        main_trend: req.body.main_trend,
        wash_care: req.body.wash_care,
        closure: req.body.closure,
        complete_look: req.body.complete_look,
        count: Number(req.body.count),
        rating: Number(req.body.rating),
        rating_count_user: Number(req.body.rating_count_user)
    })
        .then(async (data) => {
            await transport.sendMail(product_message, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else {
                    transport.sendMail(product_admin, (err, info) => {
                        if (err)
                            res.json({ Error: err.message })
                        else
                            res.send(data)
                    })
                }

            })

        })
        .catch((error) => res.json({ Error: error.message }))
}
//edit by admin 
exports.edit_admin_product = (req, res) => {
    product.updateOne({ product_id: Number(req.body.product_id) }, {
        $set: {
            email: req.body.email,
            product_id: Number(req.body.product_id),
            comp_name: req.body.comp_name,
            brand_name: req.body.brand_name,
            category: req.body.category,
            subcategory: req.body.sub_category,
            product: req.body.product,
            strike_price: Number(req.body.strike_price),
            discount: Number(req.body.discount),
            price: Number(req.body.price),
            color: req.body.color,
            description: req.body.description,
            size: req.body.size,
            qty: req.body.qty,
            product_status: req.body.product_status,
            product_keyword: req.body.product_keyword,
            product_date: req.body.product_date,
            fabric: req.body.fabric,
            pattern: req.body.pattern,
            neck: req.body.neck,
            sleeve_length: req.body.sleeve_length,
            size_fit: req.body.size_fit,
            occasion: req.body.occasion,
            main_trend: req.body.main_trend,
            wash_care: req.body.wash_care,
            closure: req.body.closure,
            complete_look: req.body.complete_look,
            image1: req.files.map((li) => fs.readFileSync(`uploads/images/${li.filename}`)),
            count: Number(req.body.count)
        }
    })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.json({ Error: error.message })
        })
}
//vendor edits product
exports.edit_vendor_product = (req, res) => {
    const vendor_edit_mail = {
        from: process.env.user_name,
        to: process.env.user_name,
        subject: `User - ${req.body.email} has edited Product ID : ${req.body.product_id}`,
        html: `Dear Admin Team , 
        <br></br>
        <br></br>
        Product ID : ${req.body.product_id} has been edited by ${req.body.email} and has resubmitted the product details. 
        Kindly verify details and approve if details are correct or reject the form if any mismatch details in the data.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Automation Team`
    }
    product.updateOne({ product_id: Number(req.body.product_id) }, {
        $set: {
            email: req.body.email,
            product_id: Number(req.body.product_id),
            comp_name: req.body.comp_name,
            brand_name: req.body.brand_name,
            category: req.body.category,
            subcategory: req.body.sub_category,
            product: req.body.product,
            strike_price: Number(req.body.strike_price),
            discount: Number(req.body.discount),
            price: Number(req.body.price),
            color: req.body.color,
            description: req.body.description,
            size: req.body.size,
            qty: req.body.qty,
            product_status: req.body.product_status,
            product_keyword: req.body.product_keyword,
            product_date: req.body.product_date,
            fabric: req.body.fabric,
            pattern: req.body.pattern,
            neck: req.body.neck,
            sleeve_length: req.body.sleeve_length,
            size_fit: req.body.size_fit,
            occasion: req.body.occasion,
            main_trend: req.body.main_trend,
            wash_care: req.body.wash_care,
            closure: req.body.closure,
            count: Number(req.body.count),
            complete_look: req.body.complete_look,
            image1: req.files.map((li) => fs.readFileSync(`uploads/images/${li.filename}`))
        }
    })
        .then((data) => {
            transport.sendMail(vendor_edit_mail, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send(data)
            })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//update prod
exports.upd_prod = (req, res) => {
    product.updateOne({ product_id: Number(req.body.product_id) }, {
        $set: {
            email: req.body.email,
            product_id: Number(req.body.product_id),
            product_status: req.body.product_status,
            product_date: req.body.product_date
        }
    })
        .then(async (data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}

//count
exports.prod_cnt = (req, res) => {
    product.find({ product_status: 'approved', count: { $gt: 0 } }).count()
        .then((data) =>
            res.send({ data })
        )
        .catch((error) => res.json({ Error: error.message }))
}

//get all prod
exports.get_all_prod = (req, res) => {
    const all_product = product.find();
    (req.query.category != '' && req.query.category != undefined) ? all_product.find({ category: req.query.category }) : all_product;
    (req.query.subcategory != '' && req.query.subcategory != undefined) ? all_product.find({ subcategory: req.query.subcategory }) : all_product;
    (req.query.prodcategory != '' && req.query.prodcategory != undefined) ? all_product.find({ product: req.query.prodcategory }) : all_product;
    (req.query.search != '' && req.query.search != undefined) ? all_product.find({
        $or: [{ product: { $regex: req.query.search, $options: 'i' } }, { description: { $regex: req.query.search, $options: 'i' } },
        { product_keyword: { $regex: req.query.search, $options: 'i' } }]
    }) : all_product;
    //vendor email
    (req.query.email != '' && req.query.email != undefined) ? all_product.find({ email: req.query.email }) : all_product;
    all_product
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        "_id": li._id,
                        "email": li.email,
                        "product_id": li.product_id,
                        "comp_name": li.comp_name,
                        "brand_name": li.brand_name,
                        "category": li.category,
                        "subcategory": li.subcategory,
                        "product": li.product,
                        "strike_price": li.strike_price,
                        "discount": li.discount,
                        "price": li.price,
                        "color": li.color,
                        "description": li.description,
                        "size": li.size,
                        "quantity": li.qty,
                        "product_status": li.product_status,
                        "product_keyword": li.product_keyword,
                        "product_date": li.product_date,
                        "fabric": li.fabric,
                        "pattern": li.pattern,
                        "neck": li.neck,
                        "sleeve_length": li.sleeve_length,
                        "size_fit": li.size_fit,
                        "occasion": li.occasion,
                        "main_trend": li.main_trend,
                        "wash_care": li.wash_care,
                        "closure": li.closure,
                        "complete_look": li.complete_look,
                        "image1": li.image1.map((li) => li.toString('base64')),
                        "count": li.count,
                        "rating": li.rating,
                        "rating_count_user": li.rating_count_user
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}
//get product based on product id
exports.product_pid = (req, res) => {
    product.find({ product_id: Number(req.query.product_id) })
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        "_id": li._id,
                        "email": li.email,
                        "product_id": li.product_id,
                        "comp_name": li.comp_name,
                        "brand_name": li.brand_name,
                        "category": li.category,
                        "subcategory": li.subcategory,
                        "product": li.product,
                        "strike_price": li.strike_price,
                        "discount": li.discount,
                        "price": li.price,
                        "color": li.color,
                        "description": li.description,
                        "size": li.size,
                        "quantity": li.qty,
                        "product_status": li.product_status,
                        "product_keywords": li.product_keyword,
                        "product_date": li.product_date,
                        "fabric": li.fabric,
                        "pattern": li.pattern,
                        "neck": li.neck,
                        "sleeve_length": li.sleeve_length,
                        "size_fit": li.size_fit,
                        "occasion": li.occasion,
                        "main_trend": li.main_trend,
                        "wash_care": li.wash_care,
                        "closure": li.closure,
                        "complete_look": li.complete_look,
                        "image1": li.image1.map((li) => li.toString('base64')),
                        "count": li.count,
                        "rating": li.rating,
                        "rating_count_user": li.rating_count_user
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}

//approve product
exports.approve_product = (req, res) => {
    let sort = req.query.sortby || 'Recommended';
    let sort_by = {}
    let page = (req.query.pageno != undefined && req.query.pageno != 0) ? (req.query.pageno - 1) : 0;
    let skip = page * 1;//(pageno * limit)
    let limit = 10;
    let search = req.query.search || '';
    let discount = req.query.discount || '';
    let size = req.query.size || '';
    let price = req.query.price || [];
    let brand = req.query.brand || [];
    let color = req.query.color || [];
    function f0() {
        if (sort == 'Recommended')
            sort_by = { product_id: 1 }
        else if (sort == "New")
            sort_by = { product_date: -1 }
        else if (sort == "Better Discount")
            sort_by = { discount: 1 }
        else if (sort == "High To Low")
            sort_by = { price: -1 }
        else if (sort == "Low To High")
            sort_by = { price: 1 }
        else if (sort == "Customer Rating")
            sort_by = { product_date: -1 }
    }
    f0()
    if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory == undefined || req.query.subcategory == '') && (req.query.prodcategory == undefined || req.query.prodcategory == '')) {
        let query = product.find({ $and: [{ category: req.query.category }, { product_status: 'approved' }, { count: { $gt: 0 } }, { $or: [{ product: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }, { product_keyword: { $regex: search, $options: 'i' } }] }] })
        query = (size != undefined && size != '') ? query.find({ size: size }) : query
        query = (discount != undefined && discount != '') ? query.find({ discount: discount }) : query
        query = (price.length > 0) ? query.find({ price: { $in: price } }) : query
        query = (brand.length > 0) ? query.find({ brand: { $in: brand } }) : query
        query = (color.length > 0) ? query.find({ color: { $in: color } }) : query
        query.sort(sort_by).skip(skip).limit(limit)
            .then((data) => {
                if (data.length > 0)
                    res.send(data.map((li) => {
                        return ({
                            "product_id": li.product_id,
                            "brand_name": li.brand_name,
                            "category": li.category,
                            "subcategory": li.subcategory,
                            "product": li.product,
                            "strike_price": li.strike_price,
                            "discount": li.discount,
                            "price": li.price,
                            "color": li.color,
                            "description": li.description,
                            "size": li.size,
                            "quantity": li.qty,
                            "product_keywords": li.product_keyword,
                            "image1": li.image1.map((li) => li.toString('base64')),
                            "vendor_email": li.email,
                            "count": li.count,
                            "rating": li.rating,
                            "rating_count_user": li.rating_count_user
                        })
                    }))
                else
                    res.send([])
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.prodcategory == undefined || req.query.prodcategory == '')) {
        let query = product.find({ $and: [{ category: req.query.category }, { subcategory: req.query.subcategory }, { product_status: 'approved' }, { count: { $gt: 0 } }, { $or: [{ product: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }, { product_keyword: { $regex: search, $options: 'i' } }] }] })
        query = (size != undefined && size != '') ? query.find({ size: size }) : query
        query = (discount != undefined && discount != '') ? query.find({ discount: discount }) : query
        query = (price.length > 0) ? query.find({ price: { $in: price } }) : query
        query = (brand.length > 0) ? query.find({ brand: { $in: brand } }) : query
        query = (color.length > 0) ? query.find({ color: { $in: color } }) : query
        query.sort(sort_by).skip(skip).limit(limit)
            .then((data) => {
                if (data.length > 0)
                    res.send(data.map((li) => {
                        return ({
                            "product_id": li.product_id,
                            "comp_name": li.comp_name,
                            "brand_name": li.brand_name,
                            "category": li.category,
                            "subcategory": li.subcategory,
                            "product": li.product,
                            "strike_price": li.strike_price,
                            "discount": li.discount,
                            "price": li.price,
                            "color": li.color,
                            "description": li.description,
                            "size": li.size,
                            "quantity": li.qty,
                            "product_keywords": li.product_keyword,
                            "image1": li.image1.map((li) => li.toString('base64')),
                            "vendor_email": li.email
                        })
                    }))
                else
                    res.send([])
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.prodcategory != undefined && req.query.prodcategory != '')) {
        let query = product.find({ $and: [{ category: req.query.category }, { subcategory: req.query.subcategory }, { product: req.query.prodcategory }, { product_status: 'approved' }, { count: { $gt: 0 } }, { $or: [{ product: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }, { product_keyword: { $regex: search, $options: 'i' } }] }] })
        query = (size != undefined && size != '') ? query.find({ size: size }) : query
        query = (discount != undefined && discount != '') ? query.find({ discount: discount }) : query
        query = (price.length > 0) ? query.find({ price: { $in: price } }) : query
        query = (brand.length > 0) ? query.find({ brand: { $in: brand } }) : query
        query = (color.length > 0) ? query.find({ color: { $in: color } }) : query
        query.sort(sort_by).skip(skip).limit(limit)
            .then((data) => {
                if (data.length > 0)
                    res.send(data.map((li) => {
                        return ({
                            "product_id": li.product_id,
                            "comp_name": li.comp_name,
                            "brand_name": li.brand_name,
                            "category": li.category,
                            "subcategory": li.subcategory,
                            "product": li.product,
                            "strike_price": li.strike_price,
                            "discount": li.discount,
                            "price": li.price,
                            "color": li.color,
                            "description": li.description,
                            "size": li.size,
                            "quantity": li.qty,
                            "product_keywords": li.product_keyword,
                            "image1": li.image1.map((li) => li.toString('base64')),
                            "vendor_email": li.email,
                            "count": li.count,
                            "rating": li.rating,
                            "rating_count_user": li.rating_count_user
                        })
                    }))
                else
                    res.send([])
            })
            .catch((error) => res.json({ Error: error.message }))
    }
}


//filter product  cnt
exports.filter_cnt = (req, res) => {
    if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory == undefined || req.query.subcategory == '') && (req.query.prodcategory == undefined || req.query.prodcategory == '')) {
        product.find({ category: req.query.category, product_status: 'approved', count: { $gt: 0 } }).count()
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.prodcategory == undefined || req.query.prodcategory == '')) {
        product.find({ $and: [{ category: req.query.category }, { subcategory: req.query.subcategory }, { product_status: 'approved' }, { count: { $gt: 0 } }] }).count()
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.prodcategory != undefined && req.query.prodcategory != '')) {
        product.find({ category: req.query.category, subcategory: req.query.subcategory, product: req.query.prodcategory, product_status: 'approved', count: { $gt: 0 } }).count()
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
}

//get prod cnt for new product add
exports.get_product_count = (req, res) => {
    product.find().sort({ product_id: -1 }).limit(1)
        .then((data) => {
            if (data.length == 0)
                res.send({ 'data': 0 })
            else
                res.json({ 'data': data[0].product_id })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//product email
exports.product_email_cnt = (req, res) => {
    product.find({ email: req.query.email, product_status: 'approved', count: { $gt: 0 } }).count()
        .then((data) => {
            res.send({ data })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//get distinct brand
exports.distinct_brand = (req, res) => {
    if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory == undefined || req.query.subcategory == '') && (req.query.productcategory == undefined || req.query.productcategory == '')) {
        product.aggregate([{ $match: { category: req.query.category, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$brand_name', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.productcategory == undefined || req.query.productcategory == '')) {
        product.aggregate([{ $match: { category: req.query.category, subcategory: req.query.subcategory, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$brand_name', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.productcategory != undefined && req.query.productcategory != '')) {
        product.aggregate([{ $match: { category: req.query.category, subcategory: req.query.subcategory, product: req.query.productcategory, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$brand_name', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
}

//get distinct price
exports.distinct_price = (req, res) => {
    if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory == undefined || req.query.subcategory == '') && (req.query.productcategory == undefined || req.query.productcategory == '')) {
        product.aggregate([{ $match: { category: req.query.category, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$price', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.productcategory == undefined || req.query.productcategory == '')) {
        product.aggregate([{ $match: { category: req.query.category, subcategory: req.query.subcategory, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$price', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.productcategory != undefined && req.query.productcategory != '')) {
        product.aggregate([{ $match: { category: req.query.category, subcategory: req.query.subcategory, product: req.query.productcategory, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$price', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
}

//get distinct color
exports.distinct_color = (req, res) => {
    if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory == undefined || req.query.subcategory == '') && (req.query.productcategory == undefined || req.query.productcategory == '')) {
        product.aggregate([{ $match: { category: req.query.category, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$color', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.productcategory == undefined || req.query.productcategory == '')) {
        product.aggregate([{ $match: { category: req.query.category, subcategory: req.query.subcategory, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$color', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.productcategory != undefined && req.query.productcategory != '')) {
        product.aggregate([{ $match: { category: req.query.category, subcategory: req.query.subcategory, product: req.query.productcategory, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$color', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
}

//get distinct discount
exports.distinct_discount = (req, res) => {
    if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory == undefined || req.query.subcategory == '') && (req.query.productcategory == undefined || req.query.productcategory == '')) {
        product.aggregate([{ $match: { category: req.query.category, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$discount', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.productcategory == undefined || req.query.productcategory == '')) {
        product.aggregate([{ $match: { category: req.query.category, subcategory: req.query.subcategory, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$discount', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
    else if ((req.query.category != undefined && req.query.category != '') && (req.query.subcategory != undefined && req.query.subcategory != '') && (req.query.productcategory != undefined && req.query.productcategory != '')) {
        product.aggregate([{ $match: { category: req.query.category, subcategory: req.query.subcategory, product: req.query.productcategory, product_status: 'approved', count: { $gt: 0 } } }, { $group: { _id: { $substr: ['$discount', 0, 10] }, count: { $sum: 1 } } }])
            .then((data) => {
                res.send({ data })
            })
            .catch((error) => res.json({ Error: error.message }))
    }
}

//delte single product
exports.delete_product = (req, res) => {
    product.deleteOne({ product_id: Number(req.query.productid) })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}

//update item stock
exports.upd_prod_item_stock = (req, res) => {
    if (req.query.increase != undefined && req.query.increase != '')
        product.updateOne({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    else if (req.query.decrease != undefined && req.query.decrease != '') {
        product.updateOne({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
}

//update no.of users and rating count n product table.
exports.upd_rating = (req, res) => {
    product.updateOne({ product_id: Number(req.query.product_id) }, {
        $set: {
            rating: Number(req.body.rating),
            rating_count_user: Number(req.body.rating_count_user)
        }
    })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))
}

//view similar product get details.
exports.similar_prod = (req, res) => {
    product.find({ product_id: { $ne: Number(req.query.pid) }, category: req.query.category, subcategory: req.query.subcategory, product: req.query.productcategory, product_status: 'approved', count: { $gt: 0 } })
        .then((data) => {
            if (data.length > 0)
                res.send(data.map((li) => {
                    return ({
                        'image': li.image1[0].toString('base64'),
                        'product_id': li.product_id,
                        'brand_name': li.brand_name,
                        'description': li.description,
                        'price': li.price,
                        'strike_price': li.strike_price,
                        'discount': li.discount
                    })
                }))
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))

}


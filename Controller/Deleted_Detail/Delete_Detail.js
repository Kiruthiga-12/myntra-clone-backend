const deleted_product_detail = require('../../Model/removed_data_model/deleted_product_detail');
const deleted_vendor_detail = require('../../Model/removed_data_model/deleted_vendor_detail');
const deleted_user_detail = require('../../Model/removed_data_model/deleted_user_detail');
const nodemailer = require('nodemailer');
//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})

//add product
exports.remove_product = (req, res) => {
    const message = {
        from: process.env.user_name,
        to: req.body.email,
        subject: `Product Id : ${req.body.id} has been deleted.`,
        html: ` Dear ${req.body.email} ,
    <br></br>
    <br></br>
    Thanks for Using Myntra. As per discussion,  Product Id ${req.body.id} has been removed successfully in our database 
    with the reason <bold><q><u>${req.body.reason}</u></q></bold>.
    <br></br>
    <br></br>
    Regards,
    <br></br>
    Myntra Team.`
    }
    deleted_product_detail.create({
        product_id: Number(req.body.id),
        product_status: req.body.status,
        vendor_email: req.body.email,
        reason: req.body.reason
    })
        .then((data) => {
            transport.sendMail(message, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send(data)
            })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//delete by vendor
exports.removed_by_vendor = (req, res) => {
    const message = {
        from: process.env.user_name,
        to: process.env.user_name,
        subject: `Product Id : ${req.body.id} has been deleted.`,
        html: ` Dear Admin Team ,
    <br></br>
    <br></br>
    As per discussion with vendor, Product Id ${req.body.id} has been removed by vendor
    with the reason <bold><q><u>${req.body.reason}</u></q></bold>.
    <br></br>
    <br></br>
    Regards,
    <br></br>
    Automation Team.`
    }
    deleted_product_detail.create({
        product_id: Number(req.body.id),
        product_status: req.body.status,
        vendor_email: req.body.email,
        reason: req.body.reason
    })
        .then((data) => {
            transport.sendMail(message, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send(data)
            })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//count
exports.removed_product_cnt = (req, res) => {
    deleted_product_detail.find().sort({ product_id: -1 }).limit(1)
        .then((data) => {
            if (data.length == 0)
                res.send({ 'data': 0 })
            else
                res.send({ 'data': data[0].product_id })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//remove vendor
exports.remove_vendor = (req, res) => {
    const message = {
        from: process.env.user_name,
        to: req.body.email,
        subject: 'Signing  off!!',
        html: ` Bye ${req.body.email} ,
    <br></br>
    <br></br>
    Thanks for Using Myntra. Its being hard to see your sign off. Your details has been removed successfully in our database 
    with the reason <bold><q><u>${req.body.reason}</u></q></bold>.
    In future if you like to join us, you can create new account and enjoy the services.
    <br></br>
    <br></br>
    Regards,
    <br></br>
    Myntra Team.`
    }
    deleted_vendor_detail.create({
        vendor_id: Number(req.body.vendor_id),
        vendor_status: req.body.status,
        vendor_email: req.body.email,
        reason: req.body.reason
    })
        .then((data) => {
            transport.sendMail(message, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send(data)
            })
        }).catch((error) => res.json({ Error: error.message }))
}

//removed vendor cnt
exports.removed_vendor_cnt = (req, res) => {
    deleted_vendor_detail.find().sort({ vendor_id: -1 }).limit(1)
        .then((data) => {
            if (data.length == 0)
                res.send({ 'data': 0 })
            else
                res.send({ 'data': data[0].vendor_id })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//remove user
exports.remove_user = (req, res) => {
    const message = {
        from: process.env.user_name,
        to: req.body.email,
        subject: 'Signing  off!!',
        html: ` Bye ${req.body.email} ,
    <br></br>
    <br></br>
    Thanks for Using Myntra. Its being hard to see your sign off. Your details has been removed successfully in our database 
    with the reason <bold><q><u>${req.body.reason}</u></q></bold>.
    In future if you like to join us, you can create new account and enjoy the services.
    <br></br>
    <br></br>
    Regards,
    <br></br>
    Myntra Team.`
    }
    deleted_user_detail.create({
        user_id: Number(req.body.id),
        user_status: req.body.status,
        user_email: req.body.email,
        reason: req.body.reason
    })
        .then((data) => {
            transport.sendMail(message, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send(data)
            })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//count
exports.removed_user_count = (req, res) => {
    deleted_user_detail.find().sort({ user_id: -1 }).limit(1)
        .then((data) => {
            if (data.length == 0)
                res.send({ 'data': 0 })
            else
                res.send({ 'data': data[0].user_id })
        })
        .catch((error) => res.json({ Error: error.message }))
}
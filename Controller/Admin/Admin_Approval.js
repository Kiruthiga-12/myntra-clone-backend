const admin_vendor_approval = require('../../Model/admin_model/admin_vendor_approval');
const admin_product_approval = require('../../Model/admin_model/admin_product_approval');
const nodemailer = require('nodemailer');
//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})

//admin vendor approval
exports.admin_vendor_approval = (req, res) => {
    const message_approval = {
        from: process.env.user_name,
        to: req.body.email,
        subject: 'Onboarding form has been approved',
        html: `Hello ${req.body.email} ,
        <br></br>
        <br></br>
        Your Onboarding form has been approved with comments <strong><q><u>${req.body.reason}</u></q></strong>. You can start uploading product details and submit for admin approval. After Admin approval , product will be available for customers.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team.`
    }
    const message_rejection = {
        from: process.env.user_name,
        to: req.body.email,
        subject: 'Onboarding form has been rejected',
        html: `Hello ${req.body.email} ,
        <br></br>
        <br></br>
        Your Onboarding form has been rejected with comments <strong><q><u>${req.body.reason}</u></q></strong>. Kindly fill the correct details and resubmit the form for admin approval.
        After Admin approval , you will be onboarded and you can sell your products online.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team.`
    }
    admin_vendor_approval.create(
        {
            vendor_id: Number(req.body.vendor_id),
            admin_id: Number(req.body.admin_id),
            vendor_email: req.body.email,
            vendor_status: req.body.status,
            reason: req.body.reason
        }
    ).then((data) => {
        if (data.vendor_status === 'approved') {
            transport.sendMail(message_approval, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send(data)
            })
        }
        else if (data.vendor_status === 'rejected') {
            transport.sendMail(message_rejection, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send(data)
            })
        }

    })
        .catch((error) => res.json({ Error: error.message }))

}
//delete 
exports.delete_admin_vendor = (req, res) => {
    admin_vendor_approval.deleteMany({ vendor_email: req.query.email })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.json({ Error: error.message }))

}
//admin prodcut approval
exports.admin_product_approval = (req, res) => {
    const product_approval = {
        from: process.env.user_name,
        to: req.body.email,
        subject: `Product Id :${req.body.product_id} form has been approved`,
        html: `Hello ${req.body.email} ,
        <br></br>
        <br></br>
        Product Id : ${req.body.product_id} has been approved with comments <strong><q><u>${req.body.reason}</u></q></strong>.Products will be available to customers for shopping.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team.`
    }
    const product_rejection = {
        from: process.env.user_name,
        to: req.body.email,
        subject: `Product Id :${req.body.product_id} form has been rejected`,
        html: `Hello ${req.body.email} ,
        <br></br>
        <br></br>
        Product Id : ${req.body.product_id} has been rejected with comments <strong><q><u>${req.body.reason}</u></q></strong>.Please check details and if there is any mismatch in data ,fill the details and resubmit the form.
        After admin approval, product will be available for customers.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team.`
    }
    const product_edited = {
        from: process.env.user_name,
        to: req.body.email,
        subject: `Product Id :${req.body.product_id} form has been edited`,
        html: `Hello ${req.body.email} ,
        <br></br>
        <br></br>
        Product Id : ${req.body.product_id} has been edited with comments <strong><q><u>${req.body.reason}</u></q></strong>.Products will be available to customers for shopping.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team`
    }
    admin_product_approval.create(
        {
            admin_id: Number(req.body.admin_id),
            vendor_id: Number(req.body.vendor_id),
            vendor_email: req.body.email,
            product_status: req.body.status,
            reason: req.body.reason,
            product_id: Number(req.body.product_id)
        }
    ).then(async (data) => {
        if (data.product_status === 'approved') {
            await transport.sendMail(product_approval, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send(data)
            })
        }
        else if (data.product_status === 'rejected') {
            await transport.sendMail(product_rejection, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send(data)
            })
        }
        else if (data.product_status === 'Edited') {
            await transport.sendMail(product_edited, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send(data)
            })
        }
    })
        .catch((error) => res.json({ Error: error.message }))

}
//delete
exports.delete_admin_product = (req, res) => {
    admin_product_approval.deleteMany({ product_id: Number(req.query.productid) }).then((data) => {
        res.send(data)
    })
        .catch((error) => res.json({ Error: error.message }))
}


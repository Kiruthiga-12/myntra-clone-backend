const declaration = require('../../../Model/vendor_model/Vendor_RegisterForm/Declaration');
const nodemailer = require('nodemailer');
//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})
//add
exports.add_det = (req, res) => {
    const message = {
        from: process.env.user_name,
        to: req.body.email,
        subject: 'Vendor Onboarding form is successfully submitted!!!',
        html: ` Dear ${req.body.email} ,
        <br></br>
        <br></br>
        You have successfully submitted vendor onboarding form. Our Team will verify the details and you will be onboarded after verification.
        Our team will contact you ,if any information is required. In case of any concerns,
        please feel free to contact us.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team `
    }
    const message_admin = {
        from: process.env.user_name,
        to: process.env.user_name,
        subject: 'Vendor Onboarding form submission',
        html: ` Dear Admin Team ,
        <br></br>
        <br></br>
        Mr/Mrs. ${req.body.email} have successfully submitted vendor onboarding form. Kindly verify the details and approve the form after Verification.
        If there is any mismatch in details, Kindly mention the reason and reject the approval.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Automation Team `
    }
    declaration.create({
        vendor_id: Number(req.body.vendor_id),
        email: req.body.email,
        accept_tc: req.body.accept_tc
    }).then((data) => {
        transport.sendMail(message, (err, info) => {
            if (err)
                res.json({ Error: error.message })
            else {
                transport.sendMail(message_admin, (err, info) => {
                    if (err)
                        res.json({ Error: err.message })
                    else {
                        res.send(data)
                    }
                })
            }
        })
    })
        .catch((error) => res.json({ Error: error.message }))
}
//edit
exports.edit_det = (req, res) => {
    const message = {
        from: process.env.user_name,
        to: req.body.email,
        subject: 'Vendor Onboarding form is successfully resubmitted!!!',
        html: ` Dear ${req.body.email} ,
        <br></br>
        <br></br>
        You have successfully resubmitted vendor onboarding form. Our Team will verify the details and you will be onboarded after verification.
        Our team will contact you ,if any information is required. In case of any concerns,
        please feel free to contact us.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team `
    }
    const message_admin = {
        from: process.env.user_name,
        to: process.env.user_name,
        subject: 'Vendor Onboarding form resubmission',
        html: ` Dear Admin Team ,  
        <br></br>
        Mr/Mrs. ${req.body.email} have successfully resubmitted vendor onboarding form. Kindly verify the details and approve the form after Verification.
        If there is any mismatch in details, Kindly mention the reason and reject the approval.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Automation Team `
    }
    declaration.updateOne({ email: req.body.email }, {
        $set: {
            vendor_id: Number(req.body.vendor_id),
            email: req.body.email,
            accept_tc: req.body.accept_tc
        }
    }).then((data) => {
        transport.sendMail(message, (err, info) => {
            if (err)
                res.json({ Error: err.message })
            else {
                transport.sendMail(message_admin, (err, info) => {
                    if (err)
                        res.json({ Error: err.message })
                    else {
                        res.send(data)
                    }
                })
            }
        })
    })
        .catch((error) => res.json({ Error: error.message }))
}
//del
exports.delete_det = (req, res) => {
    declaration.deleteOne({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get
exports.get_det = (req, res) => {
    const all = declaration.find();
    (req.query.email != undefined && req.query.email != '') ? all.find({ email: req.query.email }) : all;
    (req.query.vendor_id != undefined && req.query.vendor_id != '') ? all.find({ vendor_id: Number(req.query.vendor_id) }) : all;

    all.then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
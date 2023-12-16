const vendor_signup = require('../../Model/vendor_model/vendor_signup');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const fs = require('fs');
//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})

//add vendor
exports.add_vendor = (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.vendor_password, saltRounds);
    let fname = req.file.filename;
    vendor_signup.create({
        vendor_id: Number(req.body.vendor_id),
        vendor_mobile: req.body.vendor_mobile,
        vendor_password: hashpassword,
        company_mailid: req.body.company_mailid,
        vendor_firstname: req.body.vendor_firstname,
        vendor_lastname: req.body.vendor_lastname,
        vendor_profile: fs.readFileSync('uploads/vendor_profile/' + fname)
    }).then((data) => {
        const message = {
            from: process.env.user_name,
            to: data.company_mailid,
            subject: 'Signup Confirmation',
            html: ` Dear ${data.company_mailid} ,
            <br></br>
            <br></br>
            You have successfully signed up!!. Keep Exploring latest trends and fashions at Myntra!!
            <br></br>
            <br></br>
            Regards
            <br></br>
            Myntra Team`
        }
        transport.sendMail(message, async (err, info) => {
            if (err)
                res.json({ Error: err.message })
            else {
                let image = await data.vendor_profile.toString('base64');
                res.send({
                    "vendor_id": data.vendor_id,
                    "vendor_mobile": data.vendor_mobile,
                    "company_mailid": data.company_mailid,
                    "vendor_firstname": data.vendor_firstname,
                    "vendor_lastname": data.vendor_lastname,
                    "vendor_profile": image
                })
            }
        })
    })
        .catch((error) => res.json({ Error: error.message }))
}
//change pwd
exports.change_password = (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.vendor_password, saltRounds);
    vendor_signup.updateOne({ company_mailid: req.body.company_mailid }, {
        $set: {
            vendor_password: hashpassword,
            company_mailid: req.body.company_mailid,
        }
    }).then((data) => {
        res.send(data)
    })
        .catch((error) => res.json({ Error: error.message }))
}
//edit vendor details in edit profile page
exports.edit_det = (req, res) => {
    vendor_signup.updateOne({ company_mailid: req.query.email }, {
        $set: {
            vendor_mobile: req.body.mobile,
            vendor_firstname: req.body.firstname,
            vendor_lastname: req.body.lastname
        }
    }).then((data) => {
        res.send(data)
    })
        .catch((error) => res.json({ Error: error.message }))
}

//vendor details
exports.vendor_det = (req, res) => {
    const all_vendors = vendor_signup.find();
    (req.query.search != '' && req.query.search != undefined) ? all_vendors.find({ $or: [{ vendor_firstname: { $regex: req.query.search, $options: 'i' } }, { vendor_lastname: { $regex: req.query.search, $options: 'i' } }] }) : all_vendors;
    //based on email
    (req.query.email != '' && req.query.email != undefined) ? all_vendors.find({ company_mailid: req.query.email }) : all_vendors
    all_vendors.then((data) => {
        if (data.length > 0) {
            res.send(data.map((li) => {
                return ({
                    "vendor_id": li.vendor_id,
                    "vendor_mobile": li.vendor_mobile,
                    "company_mailid": li.company_mailid,
                    "vendor_firstname": li.vendor_firstname,
                    "vendor_lastname": li.vendor_lastname,
                    "vendor_profile": li.vendor_profile.toString('base64')
                })
            }))
        }
        else
            res.send([])
    }).catch((error) => res.json({ Error: error.message }))
}
//vendor home page request :
//vendor details
exports.vendor_det_email = (req, res) => {
    vendor_signup.find({ company_mailid: req.query.email })
        .then((data) => {
            if (data.length > 0) {
                res.send(data.map((li) => {
                    return ({
                        "vendor_id": li.vendor_id,
                        "vendor_mobile": li.vendor_mobile,
                        "company_mailid": li.company_mailid,
                        "vendor_firstname": li.vendor_firstname,
                        "vendor_lastname": li.vendor_lastname,
                        "vendor_profile": li.vendor_profile.toString('base64')
                    })
                }))
            }
            else
                res.send([])
        }).catch((error) => res.json({ Error: error.message }))
}
//delete vendor 
exports.delete_vendor = (req, res) => {
    vendor_signup.deleteOne({ company_mailid: req.query.email })
        .then((data) => {
            res.send(data)
        }).catch((error) => res.json({ Error: error.message }))
}

//count
exports.count = (req, res) => {
    vendor_signup.find().sort({ vendor_id: -1 }).limit(1)
        .then((data) => {
            if (data.length == 0)
                res.send({ 'data': 0 })
            else
                res.send({ 'data': data[0].vendor_id })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//vendor login
exports.login = (req, res) => {
    vendor_signup.find({ company_mailid: req.body.userdata }).
        then((data) => {
            if (data.length > 0) {
                const decodehashpassword = bcrypt.compareSync(req.body.password, data[0].vendor_password);
                if (decodehashpassword) {
                    jwt.sign({ email: req.body.userdata, password: req.body.password }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" }, (err, vendor_key) => {
                        if (err)
                            res.send(err.message)
                        else
                            res.send({ 'vendor_key': vendor_key, 'data': true })
                    })
                }
                else if (decodehashpassword != true)
                    res.send(false)
            }
            else if (data.length == 0) {
                res.send(false);
            }
        })
        .catch((error) => res.json({ Error: error.message }))
}
////send mail to reset link
exports.reset_link = (req, res) => {
    const message = {
        from: process.env.user_name,
        to: req.body.email,
        subject: 'Reset Password Link',
        html: `Hi ${req.body.email},
    <br></br>
    <br></br>
    Kindly reset password in the following link: 
    ${process.env.FRONTEND_URL}/partnerhome/reset_pwd
    <br></br>
    <br></br>
    Regards,
    <br></br>
    Myntra Team`
    }
    vendor_signup.find({ company_mailid: req.body.email })
        .then((data) => {
            if (data.length == 0)
                res.send('0')
            else {
                transport.sendMail(message, (err, info) => {
                    if (err)
                        res.json({ Error: err.message })
                    else
                        res.send(data)
                })
            }
        })
        .catch((error) => res.json({ Error: error.message }))
}
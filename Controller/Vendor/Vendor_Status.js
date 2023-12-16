const vendor_status = require('../../Model/vendor_model/vendor_status');
const percentage = require('../../Model/vendor_model/Vendor_RegisterForm/perecentage');
const otpmodel = require('../../Model/otp_model/otp');
const otpgen = require('otp-generator');
const nodemailer = require('nodemailer');
//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})
//get vendor count of approved vendor
exports.count = (req, res) => {
    vendor_status.find({ status: 'approved' }).count()
        .then((data) => {
            res.send({ data })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//create status 
exports.create_status = (req, res) => {
    vendor_status.create(
        {
            vendor_id: Number(req.body.vendor_id),
            email: req.body.email,
            status: req.body.status
        })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//edit status 
exports.edit_status = (req, res) => {
    vendor_status.updateOne({ email: req.body.email }, {
        $set:
        {
            vendor_id: Number(req.body.vendor_id),
            email: req.body.email,
            status: req.body.status
        }
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//get status
exports.get_status = (req, res) => {
    let status = req.query.status;
    if (status == 'approved') {
        vendor_status.find({ status: req.query.status })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
    else if (status != 'approved' && (status != '' && status != undefined)) {
        vendor_status.find({ status: { $ne: 'approved' } })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
}

//delete status
exports.delete_status = (req, res) => {
    vendor_status.deleteOne({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//get based on email
exports.get_email = (req, res) => {
    const all = vendor_status.find();
    (req.query.email != undefined && req.query.email != '') ? all.find({ email: req.query.email }) : all;
    (req.query.vendor_id != undefined && req.query.vendor_id != '') ? all.find({ vendor_id: Number(req.query.vendor_id) }) : all;
    all.then((data) => {
        if (data.length > 0)
            res.send({ 'data': data[0].status, 'vendor_id': data[0].vendor_id })
        else
            res.send({ 'data': 'no data', 'vendor_id': 0 })
    })
        .catch((error) => res.json({ Error: error.message }))
}

//create %
exports.create_perc = (req, res) => {
    percentage.create({
        vendor_id: Number(req.body.vendor_id),
        email: req.body.email,
        stepno: req.body.stepno,
        perc: 0
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//edit %
exports.edit_perc = (req, res) => {
    let step = req.body.stepno;
    let per = 0;
    if (step == '0')
        per = 0;
    else if (step == '1')
        per = 17;
    else if (step == '2')
        per = 34;
    else if (step == '3')
        per = 51;
    else if (step == '4')
        per = 68;
    else if (step == '5')
        per = 75;
    else if (step == '6')
        per = 100;
    percentage.updateOne({ email: req.body.email }, {
        $set: {
            vendor_id: Number(req.body.vendor_id),
            email: req.body.email,
            stepno: req.body.stepno,
            perc: per
        }
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//based on email
exports.email_perc = (req, res) => {
    percentage.find({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//delete perc
exports.delete_perc = (req, res) => {
    percentage.deleteOne({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}


//otp creaton
exports.create_otp = (req, res) => {
    const otp = otpgen.generate()
    const message = {
        from: process.env.user_name,
        to: req.body.email,
        subject: 'Vendor Registeration Process - OTP',
        html: `Welcome <strong>${req.body.email} </strong>,
        <br></br>
        <br></br>
        Your One Time Password (OTP) for  Vendor registeration is <strong>${otp}</strong>. Please donot share with others.
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team.`
    }
    otpmodel.create({
        email: req.body.email,
        otp: otp
    }).then((data) => {
        transport.sendMail(message, (err, info) => {
            if (err)
                res.send(err);
            else {
                res.send(data)
            }
        })
    })
        .catch((error) => res.json({ Error: error.message }))
}

//otp compare
exports.otp_compare = (req, res) => {
    otpmodel.find({ email: req.body.email }).sort({ _id: -1 }).limit(1)
        .then((data) => {
            if (data[0].otp === req.body.otp)
                res.send('true');
            else if (data[0].otp != req.body.otp)
                res.send('false');
        })
        .catch((error) => res.json({ Error: error.message }))
}
//delete otp
exports.delete_otp = (req, res) => {
    otpmodel.deleteMany({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
const admin_signup = require('../../Model/admin_model/myntra_admin_signup');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})
//abs path 
const abspath = process.cwd();
dotenv.config({ path: path.join(abspath, '../Configuration/.env') })

//add admin 
exports.add_admin = (req, res) => {
    const message = {
        from: process.env.user_name,
        to: req.body.email,
        subject: 'You have successfulluy signed up as Admin',
        html: ` Hello ${req.body.email} ,
        <br></br>
        <br></br>
        You have successfully signed up as Admin. If you have any queries ,feel free to contact us
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team.`
    }
    const hashpassword = bcrypt.hashSync(req.body.password, saltRounds);
    let fname = req.file.filename
    admin_signup.create({
        admin_email: req.body.email,
        admin_password: hashpassword,
        admin_id: Number(req.body.admin_id),
        admin_profile: fs.readFileSync('uploads/admin_profile/' + fname)
    }).then((data) => {
        transport.sendMail(message, (err, info) => {
            if (err)
                res.json({ Error: err.message })
            else {
                res.send(data)
            }
        })

    })
        .catch((error) => res.json({ Error: error.message }))
}
//login 
exports.login = (req, res) => {
    admin_signup.find({ admin_email: req.body.email })
        .then((data) => {
            if (data.length > 0) {
                const decodehashpassword = bcrypt.compareSync(req.body.password, data[0].admin_password);
                if (decodehashpassword) {
                    jwt.sign({ email: req.body.email, pwd: req.body.password }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" }, (err, admin_key) => {
                        if (err)
                            res.send(err.message)
                        else {
                            res.json({ admin_key })
                        }
                    })

                }
                else
                    res.send('Password Wrong')
            }
            else {
                res.send(data);
            }
        })
        .catch((error) => res.json({ Error: error.message }))
}
//reset password
exports.change_password = (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.admin_password, saltRounds);
    admin_signup.updateOne({ admin_email: req.body.admin_email }, {
        $set: {
            admin_password: hashpassword,
            admin_email: req.body.admin_email,
        }
    }).then((data) => {
        res.send(data)
    })
        .catch((error) => res.json({ Error: error.message }))
}
//reset link
exports.reset_link = (req, res) => {
    const message = {
        from: process.env.user_name,
        to: req.body.email,
        subject: 'Reset Password Link',
        html: `Hi ${req.body.email},
    <br></br>
    <br></br>
    Kindly reset password in the following link: 
    ${process.env.FRONTEND_URL}/admin_reset_pwd
    <br></br>
    <br></br>
    Regards,
    <br></br>
    Myntra Team`
    }
    admin_signup.find({ admin_email: req.body.email })
        .then((data) => {
            if (data.length == 0)
                res.send('0');
            else {
                transport.sendMail(message, (err, info) => {
                    if (err)
                        res.json({ Error: err.message })
                    else
                        res.send(req.body.email)
                })
            }
        }).catch((error) => res.json({ Error: error.message }))
}

//admin_count
exports.admin_count = (req, res) => {
    admin_signup.find().sort({ admin_id: -1 }).limit(1)
        .then((data) => {
            if (data.length == 0)
                res.send({ 'data': 0 })
            else
                res.send({ 'data': data[0].admin_id })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//get admin details using email
exports.admin_email = (req, res) => {
    admin_signup.find({ admin_email: req.query.email })
        .then(async (data) => {
            if (data.length > 0) {
                let image = data[0].admin_profile.toString('base64');
                res.send({
                    "_id": data[0]._id,
                    "admin_email": data[0].admin_email,
                    "admin_id": data[0].admin_id,
                    "admin_profile": image
                })
            }
            else
                res.send([])
        })
        .catch((error) => res.json({ Error: error.message }))
}
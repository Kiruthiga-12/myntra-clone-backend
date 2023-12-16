const user_signup = require('../../Model/user_model/user_signup');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})
//create user 
exports.add_user = (req, res) => {
    let fname = req.file.filename;
    const message = {
        from: process.env.user_name,
        to: req.body.mail_id,
        subject: 'User Signup was successful!!!',
        html: `Hello ${req.body.mail_id} ,
        <br></br>
        <br></br>
        You have successfully created the account.Keep Exploring Myntra and enjoy shopping online and offline!!!
        <br></br>
        <br></br>
        Regards,
        <br></br>
        Myntra Team.`
    }
    const hashpassword = bcrypt.hashSync(req.body.password, saltRounds);
    user_signup.create({
        user_id: Number(req.body.user_id),
        user_mobile: req.body.mobileno,
        user_password: hashpassword,
        user_fullname: req.body.fullname,
        user_gender: req.body.gender,
        user_mailid: req.body.mail_id,
        user_alternate_mobile: req.body.alternate_mobile,
        user_profile: fs.readFileSync('uploads/user_profile/' + fname)
    }).then((data) =>
        transport.sendMail(message, async (err, info) => {
            if (err)
                res.json({ Error: err.message })
            else {
                let image = await data.user_profile.toString('base64');
                res.send({
                    "user_id": data.user_id,
                    "user_mobile": data.user_mobile,
                    "user_profile": image
                })
            }
        })
    ).catch((error) => res.json({ Error: error.message }))
}
//user count
exports.user_count = (req, res) => {
    user_signup.find().sort({ user_id: -1 }).limit(1)
        .then((data) => {
            if (data.length == 0)
                res.send({ 'data': 0 })
            else
                res.send({ 'data': data[0].user_id })
        })
        .catch((error) => res.json({ Error: error.message }))
}
//decides need to login or signup
exports.login_signup = (req, res) => {
    user_signup.find({ user_mobile: req.body.userdata }).
        then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => res.json({ Error: error.message }))
}
//send mail with  Temporary password
exports.temp_pwd = (req, res) => {
    user_signup.find({ user_mobile: req.body.mobile })
        .then((data) => {
            const otp = otpgen.generate();
            const message = {
                from: process.env.user_name,
                to: data[0].user_mailid,
                subject: 'Temporary Password for Login!!',
                html: `Dear ${data[0].user_mailid} ,
                <br></br>
                <br></br>
                Your Temporary password is ${otp} . Kindly reset your Password using Forget Password -> Reset here option.
                <br></br>
                <br></br>
                Regards,
                <br></br>
                Myntra Team.`
            }
            const hash = bcrypt.hashSync(otp, saltRounds);
            user_signup.updateOne({ user_mailid: data[0].user_mailid }, {
                $set: {
                    user_password: hash
                }
            }).then((data) => {
                transport.sendMail(message, (err, info) => {
                    if (err)
                        res.json({ Error: err.message })
                    else
                        res.send(data)
                })
            })
                .catch((error) => res.json({ Error: error.message }))

        })
        .catch((error) => {
            res.json({ Error: error.message })
        })

}
//get All User Details.
exports.all_users = (req, res) => {
    const all_users = user_signup.find();
    //Search
    (req.query.search != '' && req.query.search != undefined) ? all_users.find({ user_fullname: { $regex: req.query.search, $options: 'i' } }) : all_users;
    //User Id
    (req.query.user_id != '' && req.query.user_id != undefined) ? all_users.find({ user_id: Number(req.query.user_id) }) : all_users;
    all_users.then((data) => {
        if (data.length > 0) {
            res.send(data.map((li) => {
                return ({
                    'user_id': li.user_id,
                    'user_mailid': li.user_mailid,
                    'user_name': li.user_fullname,
                    'user_profile': li.user_profile.toString('base64'),
                    'user_mobile': li.user_mobile,
                    'user_gender': li.user_gender,
                    'alt_mobile': li.user_alternate_mobile
                })
            }))
        }
        else
            res.send([])
    }).catch((error) => res.json({ Error: error.message }))
}

//reset password link
exports.reset_user_pwd = (req, res) => {
    user_signup.find({ user_mailid: req.body.email })
        .then((data) => {
            if (data[0].user_id) {
                const message = {
                    from: process.env.user_name,
                    to: req.body.email,
                    subject: 'User Reset password Link!!',
                    html: `Hi ${req.body.email} ,
            <br></br>
            <br></br>
            Kindly reset password in the below link : ${process.env.FRONTEND_URL}/user_reset_pwd
            <br></br>
            <br></br>
            Regards,
            <br></br>
            Myntra Team.
            `
                }
                transport.sendMail(message, (err, info) => {
                    if (err)
                        res.json({ Error: err.message })
                    else
                        res.send(data[0].user_id)
                })
            }
        })
        .catch((error) => res.json({ Error: error.message }))
}
//reset pwd
exports.change_user_pwd = (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.user_password, saltRounds);
    user_signup.updateOne({ user_mailid: req.body.user_email }, {
        $set: {
            user_password: hashpassword,
            user_mailid: req.body.user_email,
        }
    }).then((data) => {
        res.send(data)
    })
        .catch((error) => res.json({ Error: error.message }))
}

// edit profile details
exports.edit_det = (req, res) => {
    user_signup.updateOne({ user_id: Number(req.query.user_id) }, {
        $set: {
            user_mobile: req.body.mobile,
            user_gender: req.body.gender,
            user_fullname: req.body.name,
            user_mailid: req.body.mail,
            user_alternate_mobile: req.body.altmob
        }
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//user login
exports.user_login = (req, res) => {
    user_signup.find({ $or: [{ user_mobile: req.body.userdata }, { user_mailid: req.body.userdata }] }).
        then((data) => {
            if (data.length > 0) {
                const decodehashpassword = bcrypt.compareSync(req.body.password, data[0].user_password);
                if (decodehashpassword) {
                    jwt.sign({ userdata: req.body.userdata, password: req.body.password }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' }, (err, user_key) => {
                        if (err) {
                            res.send(err.message)
                        }
                        else {
                            res.send(data.map((li) => {
                                return {
                                    'user_id': li.user_id,
                                    'user_mobile': li.user_mobile,
                                    'user_gender': li.user_gender,
                                    'user_fullname': li.user_fullname,
                                    'user_mailid': li.user_mailid,
                                    'user_alternate_mobile': li.user_alternate_mobile,
                                    'user_profile': li.user_profile.toString('base64'),
                                    'user_key': user_key
                                }
                            }))
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

//delete user 
exports.delete_user = (req, res) => {
    user_signup.deleteOne({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
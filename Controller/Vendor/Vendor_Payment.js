const vendor_payment = require('../../Model/vendor_model/vendor_payment');
const nodemailer = require('nodemailer');
//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})
//add payment
exports.add_payment = (req, res) => {
    vendor_payment.create({
        order_id: Number(req.body.order_id),
        order_status: req.body.order_status,
        vendor_email: req.body.vendor_email,
        order_date: req.body.order_date,
        delivered_date: req.body.delivered_date,
        product_id: Number(req.body.product_id),
        product_price: Number(req.body.product_price),
        comission: Number(req.body.comission),
        comission_amount: Number(req.body.comission_amount),
        pay_amount: Number(req.body.pay_amount),
        transaction_id: req.body.transaction_id,
        admin_id: Number(req.body.admin_id),
        admin_email: req.body.admin_email,
        paid_date: req.body.paid_date
    })
        .then((data) => {
            const paymentmessage = {
                from: process.env.user_name,
                to: req.body.vendor_email,
                subject: `Vendor Payments: Product Id #${req.body.product_id} in Order #${req.body.order_id} amount has been paid`,
                html: `<a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Account</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Myntra.com</a>
                <br></br>
                <hr/>
                <br></br>
                Hello ${req.body.vendor_email},
                <br><br/>
                Amount for Product Id #${req.body.product_id} in Order No.#${req.body.order_id} has been paid  with Rs. ${req.body.pay_amount} to your bank account after deducting standard comission charges.kindly check.
                <br></br>
                <br></br>
                Regards,
                <br/>
                Myntra Team.`
            }
            transport.sendMail(paymentmessage, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send({ data })
            })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get details
exports.get_det = (req, res) => {
    let all = vendor_payment.find();
    (req.query.order_id != undefined && req.query.order_id != '') ? all.find({ order_id: Number(req.query.order_id) }) : all;
    (req.query.search != undefined && req.query.search != '') ? all.find({ order_id: Number(req.query.search) }) : all;
    (req.query.vendor_email != undefined && req.query.vendor_email != '') ? all.find({ vendor_email: req.query.vendor_email }) : all;
    all.sort({ order_id: 1, product_id: 1 });
    all.then((data) => res.send(data.map((li) => {
        return {
            'order_id': li.order_id,
            'order_status': li.order_status,
            'vendor_email': li.vendor_email,
            'order_date': li.order_date,
            'delivered_date': li.delivered_date,
            'product_id': li.product_id,
            'product_price': li.product_price,
            'comission': li.comission,
            'comission_amount': li.comission_amount,
            'pay_amount': li.pay_amount,
            'transaction_id': li.transaction_id,
            'admin_id': li.admin_id,
            'admin_email': li.admin_email,
            'paid_date': li.paid_date
        }
    })))
        .catch((error) => res.json({ Error: error.message }))
}

//total vendor sales amount
exports.sales_amount = (req, res) => {
    vendor_payment.aggregate([
        { $match: { vendor_email: req.query.vendor_email } },
        { $group: { _id: null, count: { $sum: '$pay_amount' } } }
    ])
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
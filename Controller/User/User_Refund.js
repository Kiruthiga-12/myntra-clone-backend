const user_refund = require('../../Model/user_model/user_refund');
const review_comments = require('../../Model/user_model/user_review_comment');
const nodemailer = require('nodemailer');
//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})
//add refund
exports.add_refund = (req, res) => {
    user_refund.create({
        order_id: Number(req.body.order_id),
        order_status: req.body.order_status,
        user_id: Number(req.body.user_id),
        user_email: req.body.user_email,
        order_date: req.body.order_date,
        cancelled_date: req.body.cancelled_date,
        refund_amount: Number(req.body.refund_amount),
        transaction_id: req.body.transaction_id,
        admin_id: Number(req.body.admin_id),
        admin_email: req.body.admin_email,
        refund_date: req.body.refund_date
    })
        .then((data) => {
            const refundmessage = {
                from: process.env.user_name,
                to: req.body.user_email,
                subject: `Your Myntra order #${req.body.order_id} with Refund amount Rs.${req.body.refund_amount} has been refunded`,
                html: `<a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Account</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Myntra.com</a>
                <br></br>
                <hr/>
                Cancelled - Order #${req.body.order_id}
                <br></br>
                Hello ${req.body.username},
                <br/>
                Your cancelled order with refund amount Rs. ${req.body.refund_amount} has been refunded to your bank account.kindly check.
                <br></br>
                Regards,
                <br/>
                Myntra Team.`
            }
            transport.sendMail(refundmessage, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send({ data })
            })
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get user refund
exports.get_refund = (req, res) => {
    const all = user_refund.find();
    (req.query.order_id != undefined && req.query.order_id != ' ') ? all.find({ order_id: Number(req.query.order_id) }) : all;
    (req.query.search != undefined && req.query.search != ' ') ? all.find({ order_id: Number(req.query.search) }) : all;
    (req.query.user_id != undefined && req.query.user_id != ' ') ? all.find({ user_id: Number(req.query.user_id) }) : all;
    all.then((data) => res.send(data.map((li) => {
        return {
            'order_id': li.order_id,
            'order_status': li.order_status,
            'user_id': li.user_id,
            'user_email': li.user_email,
            'order_date': li.order_date,
            'cancelled_date': li.cancelled_date,
            'refund_amount': li.refund_amount,
            'transaction_id': li.transaction_id,
            'admin_id': li.admin_id,
            'admin_email': li.admin_email,
            'refund_date': li.refund_date
        }
    })))
        .catch((error) => res.json({ Error: error.message }))
}

//add comments
exports.add_comment = (req, res) => {
    review_comments.create({
        user_id: Number(req.body.user_id),
        user_name: req.body.user_name,
        product_id: Number(req.body.product_id),
        rating: req.body.rating,
        comments: req.body.comments,
        commented_date: req.body.commented_date
    })
        .then((data) => {
            res.send(data);
        })
        .catch((error) => res.json({ Error: error.message }))
}

//get comments
exports.get_comments = (req, res) => {
    const comments = review_comments.find();
    //user_id
    (req.query.user_id != undefined && req.query.user_id != '') ? comments.find({ user_id: Number(req.query.user_id) }).sort({ rating: -1 }) : comments;
    //product_id
    (req.query.product_id != undefined && req.query.product_id != '') ? comments.find({ product_id: Number(req.query.product_id) }).sort({ rating: -1 }) : comments;

    comments.then((data) => {
        res.send(data.map((li) => {
            return {
                'user_id': li.user_id,
                'user_name': li.user_name,
                'product_id': li.product_id,
                'rating': li.rating,
                'comments': li.comments,
                'commented_date': li.commented_date
            }
        }));
    })
        .catch((error) => res.json({ Error: error.message }))
}

//count
exports.comments_count = (req, res) => {
    review_comments.find({ product_id: Number(req.query.product_id) }).count()
        .then((data) => res.send({ data }))
        .catch((error) => res.json({ Error: error.message }))
}
//get averag rating
exports.avg_rating = (req, res) => {
    review_comments.aggregate([
        { $match: { product_id: Number(req.query.product_id) } },
        { $group: { '_id': '$product_id', avg_rating: { $avg: '$rating' } } }
    ])
        .then((data) => res.send({ data }))
        .catch((error) => res.json({ Error: error.message }))
}
//user count wise rating details
exports.rating = (req, res) => {
    review_comments.find({ product_id: Number(req.query.product_id), rating: Number(req.query.rating) }).count()
        .then((data) => res.send({ data }))
        .catch((error) => res.json({ Error: error.message }))
}
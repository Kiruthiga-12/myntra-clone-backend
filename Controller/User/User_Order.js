const user_order = require('../../Model/user_model/user_order');
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
//add order 
exports.create_order = (req, res) => {
    let img = req.file.filename;
    user_order.create({
        order_id: Number(req.body.order_id),
        user_id: Number(req.body.user_id),
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        vendor_email: req.body.vendor_email,
        order_status: req.body.order_status,
        payment_done: req.body.payment_done,
        payment_mode: req.body.payment_mode,
        order_date: req.body.order_date,
        transaction_id: req.body.transaction_id,
        total_amount: Number(req.body.total_amount),
        discount_amount: Number(req.body.discount_amount),
        conv_fee: Number(req.body.conv_fee),
        gift_amt: Number(req.body.gift_amt),
        total_items: Number(req.body.total_items),
        total_mrp: Number(req.body.total_mrp),
        first_order: Number(req.body.first_order),
        addr: req.body.addr,
        town: req.body.town,
        pincode: req.body.pincode,
        product_id: Number(req.body.product_id),
        description: req.body.description,
        size: req.body.size,
        brand: req.body.brand,
        qty: req.body.qty,
        count: Number(req.body.count),
        price: Number(req.body.price),
        strike_price: Number(req.body.strike_price),
        discount: Number(req.body.discount),
        del: req.body.del,
        image1: fs.readFileSync('uploads/payment_order/' + img),
        packed_date: req.body.packed_date,
        shipped_date: req.body.shipped_date,
        ofd_date: req.body.ofd_date,
        delivered_date: req.body.delivered_date,
        cancelled_date: req.body.cancelled_date
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get order_count
exports.count = (req, res) => {
    user_order.find({user_id: req.query.user_id}).count()
        .then((data) => res.send({ data }))
        .catch((error) => res.json({ Error: error.message }))
}
// get order details.
exports.get_order = (req, res) => {
    const all_orders = user_order.find();
    //user id 
    (req.query.user_id != undefined && req.query.user_id != '') ? all_orders.find({ user_id: Number(req.query.user_id) }) : all_orders;
    //order id
    (req.query.order_id != undefined && req.query.order_id != '') ? all_orders.find({ order_id: Number(req.query.order_id) }) : all_orders;
    //vendor email
    (req.query.vendor_email != undefined && req.query.vendor_email != '') ? all_orders.find({ vendor_email: req.query.vendor_email }) : all_orders;
    //search value 
    (req.query.search != undefined && req.query.search != '') ? all_orders.find({ description: { $regex: req.query.search, $options: 'i' } }) : all_orders;
    //status
    (req.query.status != undefined && req.query.status != '') ? all_orders.find({ order_status: req.query.status }) : all_orders;
    //pending status
    (req.query.pending != undefined && req.query.pending != '') ? all_orders.find({ $or: [{ order_status: 'packed' }, { order_status: "shipped" }, { order_status: "out for delivery" }] }) : all_orders;
    //product id
    (req.query.product_id != undefined && req.query.product_id != '') ? all_orders.find({ product_id: { $ne: Number(req.query.product_id) } }) : all_orders;
    //date 
    if (req.query.date != undefined && req.query.date != '') {
        let date = new Date(new Date().setDate(new Date().getDate() - Number(req.query.date)));
        (date != undefined) ? all_orders.find({ order_date: { $gt: date } }) : all_orders
    }
    all_orders.then((data) => res.send(data.map((li) => {
        return ({
            'order_id': li.order_id,
            'payment_done': li.payment_done,
            'payment_mode': li.payment_mode,
            'order_date': li.order_date,
            'order_status': li.order_status,
            'user_id': li.user_id,
            'user_email': li.user_email,
            'user_name': li.user_name,
            'vendor_email': li.vendor_email,
            'product_id': li.product_id,
            'description': li.description,
            'size': li.size,
            'brand': li.brand,
            'qty': li.qty,
            'count': li.count,
            'price': li.price,
            'strike_price': li.strike_price,
            'discount': li.discount,
            'image1': li.image1[0].toString('base64'),
            'del': li.del,
            'transaction_id': li.transaction_id,
            'total_amount': li.total_amount,
            'discount_amount': li.discount_amount,
            'conv_fee': li.conv_fee,
            'gift_amt': li.gift_amt,
            'total_items': li.total_items,
            'total_mrp': li.total_mrp,
            'first_order': li.first_order,
            'addr': li.addr,
            'town': li.town,
            'pincode': li.pincode,
            'packed_date': li.packed_date,
            'shipped_date': li.shipped_date,
            'ofd_date': li.ofd_date,
            'delivered_date': li.delivered_date,
            'cancelled_date': li.cancelled_date
        })
    })))
        .catch((error) => res.json({ Error: error.message }))
}

//get unique order details
exports.unique_order = (req, res) => {
    if (req.query.pending == undefined && req.query.vendor_email == undefined && req.query.all != undefined) {
        if (req.query.search == undefined)
            user_order.aggregate([
                { "$group": { "_id": "$order_id", "doc": { "$first": "$$ROOT" } } },
                { "$replaceRoot": { "newRoot": "$doc" } },
                { "$sort": { order_id: 1 } }
            ]).then((data) => res.send(data.map((li) => {
                return ({
                    'order_id': li.order_id,
                    'payment_done': li.payment_done,
                    'payment_mode': li.payment_mode,
                    'order_date': li.order_date,
                    'order_status': li.order_status,
                    'user_id': li.user_id,
                    'user_email': li.user_email,
                    'user_name': li.user_name,
                    'vendor_email': li.vendor_email,
                    'product_id': li.product_id,
                    'description': li.description,
                    'size': li.size,
                    'brand': li.brand,
                    'qty': li.qty,
                    'count': li.count,
                    'price': li.price,
                    'strike_price': li.strike_price,
                    'discount': li.discount,
                    'image1': li.image1[0].toString('base64'),
                    'del': li.del,
                    'transaction_id': li.transaction_id,
                    'total_amount': li.total_amount,
                    'discount_amount': li.discount_amount,
                    'conv_fee': li.conv_fee,
                    'gift_amt': li.gift_amt,
                    'total_items': li.total_items,
                    'total_mrp': li.total_mrp,
                    'first_order': li.first_order,
                    'addr': li.addr,
                    'town': li.town,
                    'pincode': li.pincode,
                    'packed_date': li.packed_date,
                    'shipped_date': li.shipped_date,
                    'ofd_date': li.ofd_date,
                    'delivered_date': li.delivered_date,
                    'cancelled_date': li.cancelled_date
                })
            })))
                .catch((error) => res.json({ Error: error.message }))
        else if (req.query.search != undefined)
            user_order.aggregate([{ $match: { order_id: Number(req.query.search) } },
            { "$group": { "_id": "$order_id", "doc": { "$first": "$$ROOT" } } },
            { "$replaceRoot": { "newRoot": "$doc" } },
            { "$sort": { order_id: 1 } }
            ]).then((data) => res.send(data.map((li) => {
                return ({
                    'order_id': li.order_id,
                    'payment_done': li.payment_done,
                    'payment_mode': li.payment_mode,
                    'order_date': li.order_date,
                    'order_status': li.order_status,
                    'user_id': li.user_id,
                    'user_email': li.user_email,
                    'user_name': li.user_name,
                    'vendor_email': li.vendor_email,
                    'product_id': li.product_id,
                    'description': li.description,
                    'size': li.size,
                    'brand': li.brand,
                    'qty': li.qty,
                    'count': li.count,
                    'price': li.price,
                    'strike_price': li.strike_price,
                    'discount': li.discount,
                    'image1': li.image1[0].toString('base64'),
                    'del': li.del,
                    'transaction_id': li.transaction_id,
                    'total_amount': li.total_amount,
                    'discount_amount': li.discount_amount,
                    'conv_fee': li.conv_fee,
                    'gift_amt': li.gift_amt,
                    'total_items': li.total_items,
                    'total_mrp': li.total_mrp,
                    'first_order': li.first_order,
                    'addr': li.addr,
                    'town': li.town,
                    'pincode': li.pincode,
                    'packed_date': li.packed_date,
                    'shipped_date': li.shipped_date,
                    'ofd_date': li.ofd_date,
                    'delivered_date': li.delivered_date,
                    'cancelled_date': li.cancelled_date
                })
            })))
                .catch((error) => res.json({ Error: error.message }))
    }
    else if (req.query.pending == undefined && req.query.vendor_email == undefined && req.query.all == undefined)
        user_order.aggregate([{ $match: { order_status: req.query.status } },
        { "$group": { "_id": "$order_id", "doc": { "$first": "$$ROOT" } } },
        { "$replaceRoot": { "newRoot": "$doc" } },
        { "$sort": { order_id: 1 } }
        ]).then((data) => res.send(data.map((li) => {
            return ({
                'order_id': li.order_id,
                'payment_done': li.payment_done,
                'payment_mode': li.payment_mode,
                'order_date': li.order_date,
                'order_status': li.order_status,
                'user_id': li.user_id,
                'user_email': li.user_email,
                'user_name': li.user_name,
                'vendor_email': li.vendor_email,
                'product_id': li.product_id,
                'description': li.description,
                'size': li.size,
                'brand': li.brand,
                'qty': li.qty,
                'count': li.count,
                'price': li.price,
                'strike_price': li.strike_price,
                'discount': li.discount,
                'image1': li.image1[0].toString('base64'),
                'del': li.del,
                'transaction_id': li.transaction_id,
                'total_amount': li.total_amount,
                'discount_amount': li.discount_amount,
                'conv_fee': li.conv_fee,
                'gift_amt': li.gift_amt,
                'total_items': li.total_items,
                'total_mrp': li.total_mrp,
                'first_order': li.first_order,
                'addr': li.addr,
                'town': li.town,
                'pincode': li.pincode,
                'packed_date': li.packed_date,
                'shipped_date': li.shipped_date,
                'ofd_date': li.ofd_date,
                'delivered_date': li.delivered_date,
                'cancelled_date': li.cancelled_date
            })
        })))
            .catch((error) => res.json({ Error: error.message }))
    else if (req.query.pending != undefined && req.query.vendor_email == undefined && req.query.all == undefined) {
        user_order.aggregate([{ $match: { $or: [{ order_status: "packed" }, { order_status: 'shipped' }, { order_status: "out for delivery" }] } },
        { "$group": { "_id": "$order_id", "doc": { "$first": "$$ROOT" } } },
        { "$replaceRoot": { "newRoot": "$doc" } },
        { "$sort": { order_id: 1 } }
        ]).then((data) => res.send(data.map((li) => {
            return ({
                'order_id': li.order_id,
                'payment_done': li.payment_done,
                'payment_mode': li.payment_mode,
                'order_date': li.order_date,
                'order_status': li.order_status,
                'user_id': li.user_id,
                'user_email': li.user_email,
                'user_name': li.user_name,
                'vendor_email': li.vendor_email,
                'product_id': li.product_id,
                'description': li.description,
                'size': li.size,
                'brand': li.brand,
                'qty': li.qty,
                'count': li.count,
                'price': li.price,
                'strike_price': li.strike_price,
                'discount': li.discount,
                'image1': li.image1[0].toString('base64'),
                'del': li.del,
                'transaction_id': li.transaction_id,
                'total_amount': li.total_amount,
                'discount_amount': li.discount_amount,
                'conv_fee': li.conv_fee,
                'gift_amt': li.gift_amt,
                'total_items': li.total_items,
                'total_mrp': li.total_mrp,
                'first_order': li.first_order,
                'addr': li.addr,
                'town': li.town,
                'pincode': li.pincode,
                'packed_date': li.packed_date,
                'shipped_date': li.shipped_date,
                'ofd_date': li.ofd_date,
                'delivered_date': li.delivered_date,
                'cancelled_date': li.cancelled_date
            })
        })))
            .catch((error) => res.json({ Error: error.message }))
    }
    else if (req.query.pending == undefined && req.query.vendor_email != undefined && req.query.all == undefined) {
        if (req.query.search == undefined)
            user_order.aggregate([{ $match: { vendor_email: req.query.vendor_email } },
            { "$group": { "_id": "$order_id", "doc": { "$first": "$$ROOT" } } },
            { "$replaceRoot": { "newRoot": "$doc" } },
            { "$sort": { order_id: 1 } }
            ]).then((data) => res.send(data.map((li) => {
                return ({
                    'order_id': li.order_id,
                    'payment_done': li.payment_done,
                    'payment_mode': li.payment_mode,
                    'order_date': li.order_date,
                    'order_status': li.order_status,
                    'user_id': li.user_id,
                    'user_email': li.user_email,
                    'user_name': li.user_name,
                    'vendor_email': li.vendor_email,
                    'product_id': li.product_id,
                    'description': li.description,
                    'size': li.size,
                    'brand': li.brand,
                    'qty': li.qty,
                    'count': li.count,
                    'price': li.price,
                    'strike_price': li.strike_price,
                    'discount': li.discount,
                    'image1': li.image1[0].toString('base64'),
                    'del': li.del,
                    'transaction_id': li.transaction_id,
                    'total_amount': li.total_amount,
                    'discount_amount': li.discount_amount,
                    'conv_fee': li.conv_fee,
                    'gift_amt': li.gift_amt,
                    'total_items': li.total_items,
                    'total_mrp': li.total_mrp,
                    'first_order': li.first_order,
                    'addr': li.addr,
                    'town': li.town,
                    'pincode': li.pincode,
                    'packed_date': li.packed_date,
                    'shipped_date': li.shipped_date,
                    'ofd_date': li.ofd_date,
                    'delivered_date': li.delivered_date,
                    'cancelled_date': li.cancelled_date
                })
            })))
                .catch((error) => res.json({ Error: error.message }))
        else if (req.query.search != undefined) {
            user_order.aggregate([{ $match: { vendor_email: req.query.vendor_email, order_id: Number(req.query.search) } },
            { "$group": { "_id": "$order_id", "doc": { "$first": "$$ROOT" } } },
            { "$replaceRoot": { "newRoot": "$doc" } },
            { "$sort": { order_id: 1 } }
            ]).then((data) => res.send(data.map((li) => {
                return ({
                    'order_id': li.order_id,
                    'payment_done': li.payment_done,
                    'payment_mode': li.payment_mode,
                    'order_date': li.order_date,
                    'order_status': li.order_status,
                    'user_id': li.user_id,
                    'user_email': li.user_email,
                    'user_name': li.user_name,
                    'vendor_email': li.vendor_email,
                    'product_id': li.product_id,
                    'description': li.description,
                    'size': li.size,
                    'brand': li.brand,
                    'qty': li.qty,
                    'count': li.count,
                    'price': li.price,
                    'strike_price': li.strike_price,
                    'discount': li.discount,
                    'image1': li.image1[0].toString('base64'),
                    'del': li.del,
                    'transaction_id': li.transaction_id,
                    'total_amount': li.total_amount,
                    'discount_amount': li.discount_amount,
                    'conv_fee': li.conv_fee,
                    'gift_amt': li.gift_amt,
                    'total_items': li.total_items,
                    'total_mrp': li.total_mrp,
                    'first_order': li.first_order,
                    'addr': li.addr,
                    'town': li.town,
                    'pincode': li.pincode,
                    'packed_date': li.packed_date,
                    'shipped_date': li.shipped_date,
                    'ofd_date': li.ofd_date,
                    'delivered_date': li.delivered_date,
                    'cancelled_date': li.cancelled_date
                })
            })))
                .catch((error) => res.json({ Error: error.message }))
        }
    }
}

//get order status and its count
exports.order_status_cnt = (req, res) => {
    if (req.query.vendor_email == undefined) {
        if (req.query.pending == undefined) {
            user_order.aggregate([{ $match: { order_status: req.query.order_status } }, { $group: { _id: '$order_id' } }])
                .then((data) => {
                    res.send({ data })
                })
                .catch((error) => res.json({ Error: error.message }))
        }
        else if (req.query.pending != undefined) {
            user_order.aggregate([{ $match: { $or: [{ order_status: 'packed' }, { order_status: 'shipped' }, { order_status: 'out for delivery' }] } }, { $group: { _id: '$order_id' } }])
                .then((data) => {
                    res.send({ data })
                })
                .catch((error) => res.json({ Error: error.message }))
        }
    }
    else if (req.query.vendor_email != undefined) {
        if (req.query.pending == undefined) {
            user_order.aggregate([{ $match: { vendor_email: req.query.vendor_email, order_status: req.query.order_status } }, { $group: { _id: { $substr: ['$order_id', 0, 10] } } }])
                .then((data) => {
                    res.send({ data })
                })
                .catch((error) => res.json({ Error: error.message }))
        }
        else if (req.query.pending != undefined) {
            user_order.aggregate([{ $match: { $or: [{ order_status: 'packed' }, { order_status: 'shipped' }, { order_status: 'out for delivery' }] } }, { $group: { _id: '$order_id' } }])
                .then((data) => {
                    res.send({ data })
                })
                .catch((error) => res.json({ Error: error.message }))
        }
    }
}


//update order status
exports.upd_order_status = (req, res) => {
    let ord = user_order.find();
    if (req.body.order_status == 'confirmed')
        ord = user_order.updateMany({ user_id: Number(req.query.user_id), order_id: Number(req.query.order_id) }, {
            $set: {
                order_status: req.body.order_status
            }
        })
    else if (req.body.order_status == 'packed')
        ord = user_order.updateMany({ user_id: Number(req.query.user_id), order_id: Number(req.query.order_id) }, {
            $set: {
                order_status: req.body.order_status,
                packed_date: req.body.packed_date
            }
        })
    else if (req.body.order_status == 'shipped')
        ord = user_order.updateMany({ user_id: Number(req.query.user_id), order_id: Number(req.query.order_id) }, {
            $set: {
                order_status: req.body.order_status,
                shipped_date: req.body.shipped_date
            }
        })
    else if (req.body.order_status == 'out for delivery')
        ord = user_order.updateMany({ user_id: Number(req.query.user_id), order_id: Number(req.query.order_id) }, {
            $set: {
                order_status: req.body.order_status,
                ofd_date: req.body.ofd_date
            }
        })
    else if (req.body.order_status == 'delivered')
        ord = user_order.updateMany({ user_id: Number(req.query.user_id), order_id: Number(req.query.order_id) }, {
            $set: {
                order_status: req.body.order_status,
                delivered_date: req.body.delivered_date
            }
        })
    else if (req.body.order_status == 'cancelled')
        ord = user_order.updateMany({ user_id: Number(req.query.user_id), order_id: Number(req.query.order_id) }, {
            $set: {
                order_status: req.body.order_status,
                cancelled_date: req.body.cancelled_date
            }
        })
    ord.then((data) => {
        if (req.body.order_status == 'packed') {
            const packedmessage = {
                from: process.env.user_name,
                to: req.body.usermail,
                subject: `Your Myntra order #${req.body.orderid} of ${req.body.total_items} items has been packed`,
                html: `<a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Account</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Myntra.com</a>
                    <br></br>
                    <hr/>
                    Packed Confirmation - Order #${req.body.orderid}
                    <br></br>
                    Hello ${req.body.username},
                    <br/>
                    We thought you'd like to know that we've packed your item(s). Your order is on the way. If you need to return an item from this shipment or manage other orders, please visit <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> on Myntra.
                    <br></br>
                    Yor order will be sent to :
                    ${req.body.username},
                    ${req.body.addr},
                    ${req.body.town},
                    ${req.body.pincode}
                    <br></br>
                    Order Summary:
                    <hr/>
                    Order# ${req.body.orderid}
                    <br></br>
                    Total MRP : Rs.${req.body.total_mrp}.00
                    </br>
                    Discount amount : Rs.${req.body.discount}.00
                    </br>
                    Convenience fee : Rs.${req.body.conv_fee}.00
                    </br>
                    Gift amount : Rs.${req.body.gift_amt}.00
                    </br>
                    First order : Rs.${req.body.first_order}.00
                    </br>
                    Order Total amount  : Rs.${req.body.total_amount}.00
                    <br></br>
                    Regards,
                    <br/>
                    Myntra Team.`
            }


            transport.sendMail(packedmessage, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send({ data })
            })
        }
        else if (req.body.order_status == 'shipped') {
            const shippedmessage = {
                from: process.env.user_name,
                to: req.body.usermail,
                subject: `Your Myntra order #${req.body.orderid} of ${req.body.total_items} items has been shipped`,
                html: `<a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Account</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Myntra.com</a>
                    <br></br>
                    <hr/>
                    Shipped Confirmation - Order #${req.body.orderid}
                    <br></br>
                    Hello ${req.body.username},
                    <br/>
                    We thought you'd like to know that we've shipped your item(s). Your order is on the way. If you need to return an item from this shipment or manage other orders, please visit <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> on Myntra.
                    <br></br>
                    Yor order will be sent to :
                    ${req.body.username},
                    ${req.body.addr},
                    ${req.body.town},
                    ${req.body.pincode}
                    <br></br>
                    Order Summary:
                    <hr/>
                    Order# ${req.body.orderid}
                    <br></br>
                    Total MRP : Rs.${req.body.total_mrp}.00
                    </br>
                    Discount amount : Rs.${req.body.discount}.00
                    </br>
                    Convenience fee : Rs.${req.body.conv_fee}.00
                    </br>
                    Gift amount : Rs.${req.body.gift_amt}.00
                    </br>
                    First order : Rs.${req.body.first_order}.00
                    </br>
                    Order Total amount  : Rs.${req.body.total_amount}.00
                    <br></br>
                    Regards,
                    <br/>
                    Myntra Team.`
            }


            transport.sendMail(shippedmessage, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send({ data })
            })
        }
        else if (req.body.order_status == 'out for delivery') {
            const ofdmessage = {
                from: process.env.user_name,
                to: req.body.usermail,
                subject: `Your Myntra order #${req.body.orderid} of ${req.body.total_items}`,
                html: `<a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Account</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Myntra.com</a>
                    <br></br>
                    <hr/>
                    Out For Delivery - Order #${req.body.orderid}
                    <br></br>
                    Hello ${req.body.username},
                    <br/>
                    Your package will be delivered between 7:00AM and 10:00PM by our Myntra Delivery Agent.
                    <br></br>
                    Regards,
                    <br/>
                    Myntra Team.`
            }


            transport.sendMail(ofdmessage, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send({ data })
            })
        }
        else if (req.body.order_status == 'delivered') {
            const delivermessage = {
                from: process.env.user_name,
                to: req.body.usermail,
                subject: `Your Myntra order #${req.body.orderid} of ${req.body.total_items} has been Delivered`,
                html: `<a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Account</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Myntra.com</a>
                    <br></br>
                    <hr/>
                    Delivered - Order #${req.body.orderid}
                    <br></br>
                    Hello ${req.body.username},
                    <br/>
                    Your package has been delivered!
                    <br></br>
                    Regards,
                    <br/>
                    Myntra Team.`
            }


            transport.sendMail(delivermessage, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send({ data })
            })
        }
        else if (req.body.order_status == 'cancelled') {
            const cancelmessage = {
                from: process.env.user_name,
                to: req.body.usermail,
                subject: `Your Myntra order #${req.body.orderid} of ${req.body.total_items} has been Cancelled`,
                html: `<a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Account</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Myntra.com</a>
                    <br></br>
                    <hr/>
                    Cancelled - Order #${req.body.orderid}
                    <br></br>
                    Hello ${req.body.username},
                    <br/>
                    Your package has been cancelled.
                    <br></br>
                    Total amount Rs.${req.body.total_amount} will be refunded to your bank account within 3 working days!!.
                    <br></br>
                    Regards,
                    <br/>
                    Myntra Team.`
            }


            transport.sendMail(cancelmessage, (err, info) => {
                if (err)
                    res.json({ Error: err.message })
                else
                    res.send({ data })
            })
        }
        else if (req.body.order_status == 'confirmed') {
            res.send(data)
        }
    })
        .catch((error) => res.json({ Error: error.message }))
}


//get order count
exports.get_ord_cnt = (req, res) => {
    user_order.aggregate([
        { $group: { _id: { $substr: ['$order_id', 0, 10] }, count: { $sum: 1 } } },
        { $sort: { _id: -1 } }
    ]).collation({locale:"en_US",numericOrdering:true})
        .limit(1)
        .then((data) => res.send({ 'data': data }))
        .catch((error) => res.json({ Error: error.message }))
}
//get total sales amount 
exports.sales_amt = (req, res) => {
    user_order.aggregate([
        { "$group": { "_id": "$order_id", "doc": { "$first": "$$ROOT" } } },
        { "$replaceRoot": { "newRoot": "$doc" } },
        { "$group": { "_id": "null", "grandtotal": { "$sum": "$total_amount" } } }
    ]).then((data) => res.send({ data }))
        .catch((error) => res.json({ Error: error.message }))
}

//update count i.e  item in stock in order model .
exports.upd_order_itemstock = (req, res) => {
    if (req.query.increase != undefined && req.query.increase != '')
        user_order.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    else if (req.query.decrease != undefined && req.query.decrease != '') {
        user_order.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
    else if (req.query.zero != undefined && req.query.zero != '') {
        user_order.updateMany({ product_id: Number(req.query.product_id) }, {
            $set: {
                count: Number(req.body.count)
            }
        })
            .then((data) => res.send(data))
            .catch((error) => res.json({ Error: error.message }))
    }
}

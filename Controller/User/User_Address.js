const user_addr = require('../../Model/user_model/user_address');
const user_del_adr = require('../../Model/user_model/user_del_addr');

//only pincode.
exports.add_pincode = (req, res) => {
    user_addr.create({
        user_id: Number(req.body.user_id),
        pincode: req.body.pincode,
        adr_id: Number(req.body.adr_id)
    })
        .then((data) =>
            res.send(data)
        )
        .catch((error) => res.json({ Error: error.message }))
}

//get full address
exports.add_fulldet = (req, res) => {
    user_addr.create(
        {
            user_id: Number(req.body.user_id),
            name: req.body.name,
            mobile_no: req.body.mob,
            pincode: req.body.pincode,
            addr: req.body.addr,
            town: req.body.town,
            adr_type: req.body.adr_type,
            adr_id: Number(req.body.adr_id)
        })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get all addres based on user_id
exports.get_adr_userid = (req, res) => {
    user_addr.find({ user_id: Number(req.query.user_id), name: { $ne: undefined } })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get latest address
exports.latest_addr = (req, res) => {
    user_addr.find({ user_id: Number(req.query.user_id) }).sort({ adr_id: -1 })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//get count 
exports.count = (req, res) => {
    user_addr.find({ user_id: Number(req.query.user_id) }).count()
        .then((data) =>
            res.json({ 'data': data })
        )
        .catch((error) => res.json({ Error: error.message }))
}

//edit addr
exports.edit_addr = (req, res) => {
    user_addr.updateOne({ user_id: Number(req.query.user_id), adr_id: Number(req.body.adr_id) }, {
        $set:
        {
            user_id: Number(req.body.user_id),
            name: req.body.name,
            mobile_no: req.body.mob,
            pincode: req.body.pincode,
            addr: req.body.addr,
            town: req.body.town,
            adr_type: req.body.adr_type,
            adr_id: Number(req.body.adr_id)
        }
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//edit pincode
exports.edit_pincode = (req, res) => {
    user_addr.updateOne({ user_id: Number(req.query.user_id), adr_id: Number(req.body.adr_id) },
        { $set: { user_id: Number(req.body.user_id), pincode: req.body.pincode, adr_id: Number(req.body.adr_id) } })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//delete address
exports.delete_addr = (req, res) => {
    user_addr.deleteOne({ user_id: Number(req.query.user_id), adr_id: Number(req.query.adr_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//delete all addr
exports.delete_all_addr = (req, res) => {
    user_addr.deleteMany({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//final product delivered address
exports.get_del_addr = (req, res) => {
    user_del_adr.find({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}
//adding delivery address
exports.add_del_addr = (req, res) => {
    user_del_adr.create({
        user_id: Number(req.body.user_id),
        name: req.body.name,
        mobile_no: req.body.mobile_no,
        pincode: req.body.pincode,
        addr: req.body.addr,
        town: req.body.town,
        adr_type: req.body.adr_type,
        adr_id: Number(req.body.adr_id)
    })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))
}

//deleting  del address
exports.delete_del_addr = (req, res) => {
    user_del_adr.deleteOne({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))

}
//delete all 
exports.delete_all_del_addr = (req, res) => {
    user_del_adr.deleteMany({ user_id: Number(req.query.user_id) })
        .then((data) => res.send(data))
        .catch((error) => res.json({ Error: error.message }))

}

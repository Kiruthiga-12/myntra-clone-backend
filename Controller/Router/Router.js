const exp = require('express');
const router = exp.Router();
const bp = require('body-parser');
const nodemailer = require('nodemailer');
const uenc = bp.json();
const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');

//admin 
const admin_signup = require('../Admin/Admin_Signup');
const admin_add_det = require('../Admin/Admin_Add_Det');
const deal = require('../Admin/HomePage_Deal');
const best_buys = require('../Admin/HomePage_buys');
const top_picks = require('../Admin/HomePage_picks');
const slider = require('../Admin/HomePage_slider');
const category_to_bag = require('../Admin/HomePage_Tobag');
const vendor_landing = require('../Admin/HomePage_vendorland');
const category = require('../Admin/Category');
const prodcat = require('../Admin/ProductCategory');
const delete_detail = require('../Deleted_Detail/Delete_Detail');
const admin_approve = require('../Admin/Admin_Approval');

//user 
const subscription = require('../User/User_Subscription');
const user_refund = require('../User/User_Refund');
const user_signup = require('../User/User_Signup');
const user_add_det = require('../User/User_Add_Det');
const user_wishlist = require('../User/User_Wishlist');
const user_cart = require('../User/User_Cart');
const user_gift = require('../User/User_Gift');
const user_order = require('../User/User_Order');
const user_amount = require('../User/User_Amount');
const place_order = require('../User/Place_Order');
const user_addr = require('../User/User_Address');

//vendor 
const delete_profile = require('../Profile/Delete_Profile');
const vendor_signup = require('../Vendor/Vendor_Signup');
const vendor_payment = require('../Vendor/Vendor_Payment');
const vendor_add_det = require('../Vendor/Vendor_Add_Det');
const vendor_status = require('../Vendor/Vendor_Status');
const gst = require('../Vendor/Vendor_Registeration/GST');
const bc = require('../Vendor/Vendor_Registeration/Basic_Contact');
const wh = require('../Vendor/Vendor_Registeration/Warehouse');
const bank = require('../Vendor/Vendor_Registeration/Bank_Detail');
const brand = require('../Vendor/Vendor_Registeration/Brand_Detail');
const decl = require('../Vendor/Vendor_Registeration/Declaration');
const product = require('../Product/Product');

const saltRounds = 10;

//abs path 
const abspath = process.cwd();

//configuring env file
dotenv.config({ path: path.join(abspath, '../Configuration/.env') })
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//Nodemailer transport 
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user_name,
        pass: process.env.pwd
    }
})

const multer = require('multer');

///////////////////////     ADMIN DETAILS   ////////////////////////////////////////////
//Admin Signup pages
const admin_verifyToken = (req, res, next) => {
    jwt.verify(req.headers['admin_key'], process.env.JWT_SECRET_KEY, (err, token) => {
        if (err)
            res.json({ 'error': '401 Not Authenticated' });
        else
            next();
    })
}
router.patch('/admin_signup', uenc, admin_signup.change_password);
router.post('/admin_reset_mailpwd', uenc, admin_signup.reset_link);
router.post('/admin_login', uenc, admin_signup.login);
router.get('/get_admin_cnt', admin_signup.admin_count);
router.get('/get_admin_email', admin_verifyToken, admin_signup.admin_email);
const admin_profile = multer.diskStorage(
    {
        destination: function (req, files, cb) {
            cb(null, 'uploads/admin_profile')
        },
        filename: function (req, files, cb) {
            cb(null, files.originalname)
        }
    }
)
const admin_multer = multer({
    storage: admin_profile
})
router.post('/admin_signup', admin_multer.single('admin_profile'), admin_signup.add_admin);

//delete images upload folder
router.get('/delete_user_profile', delete_profile.user_profile);
router.get('/delete_admin_profile', delete_profile.admin_profile);
router.get('/delete_vendor_profile', delete_profile.vendor_profile)
router.get('/delete_signature_logo', delete_profile.vendor_signature);
router.get('/delete_brand_logo', delete_profile.vendor_brand_logo);
router.get('/delete_toppick_list', delete_profile.toppick_list);
router.get('/delete_product_profile', delete_profile.product_profile);
router.get('/delete_user_wishlistprofile', delete_profile.wishlist_profile);
router.get('/delete_deal_list', delete_profile.deal_list);
router.get('/delete_cattobag_list', delete_profile.cattobag_list);
router.get('/delete_bestbuys_list', delete_profile.buys_list);
router.get('/delete_cart_profile', delete_profile.cart_profile);
router.get('/delete_placeorder_img', delete_profile.placeorder);
router.get('/delete_vendorland_list', delete_profile.vendorland_list);
router.get('/delete_payment_orderprofile', delete_profile.order_profile);
router.get('/delete_slider_list', delete_profile.slider_list);

//category
router.post('/add_category', uenc, category.add_category);
router.patch('/edit_category', uenc, category.edit_category);
router.delete('/delete_category', category.delete_category);
router.get('/get_category', category.get_category);
router.get('/get_category_cat', category.get_cat);

//sub category
router.post('/add_subcategory', uenc, category.add_subcat);
router.patch('/edit_subcategory', uenc, category.edit_subcat);
router.delete('/delete_subcategory', category.delete_subcat)
router.patch('/edit_subcategory_subcat', uenc, category.upd_subcat);
router.delete('/delete_subcategory_subcat', category.remove_subcat);
router.get('/get_subcategory', category.get_subcat);
router.get('/get_subcategory_cat', category.subcat_cat);
router.get('/get_subcategory_subcat', category.subcat_subcat);
router.get('/get_subcategory_limit', category.subcat_limit);

//product category
router.post('/add_productcategory', uenc, prodcat.add_prodcat);
router.patch('/edit_productcategory', uenc, prodcat.edit_prodcat);
router.delete('/delete_productcategory', prodcat.delete_prodcat);
router.patch('/edit_productcategory_subcat', uenc, prodcat.upd_prodcat_subcat);
router.delete('/delete_productcategory_subcat', prodcat.del_subcat_prodcat);
router.patch('/edit_productcategory_product', uenc, prodcat.edit_prodcat_prodcat);
router.delete('/delete_productcategory_productcat', prodcat.delete_prodcat_prodcat);
router.get('/get_productcategory', prodcat.get_all);
router.get('/get_productcategory_cat', prodcat.get_cat_subcat);
router.get('/get_productcategory_category', prodcat.get_cat);
router.get('/get_productcategory_product', prodcat.get_prodcat);
router.get('/get_productcategory_limit', prodcat.limit);

//admin  Approval
router.post('/admin_vendor_approval', uenc, admin_approve.admin_vendor_approval);
router.delete('/delete_admin_vendor', admin_approve.delete_admin_vendor);

//admin product Approval
router.post('/admin_product_approval', uenc, admin_approve.admin_product_approval);
router.delete('/delete_admin_product', admin_approve.delete_admin_product);

//product details.
const image_destination = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/images')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const image_upload = multer({
    storage: image_destination
})


router.post('/add_product', image_upload.array('image1'), product.add_prod);
router.patch('/add_product', uenc, product.upd_prod);
router.get('/get_prod_cnt', product.prod_cnt);
router.get('/get_product', product.get_all_prod);
router.get('/get_product_product_id', product.product_pid);
router.get('/get_approved_product', product.approve_product);
router.get('/get_product_filters_cnt', product.filter_cnt);
router.get('/get_product_cnt', product.get_product_count);
router.get('/get_product_email_cnt', product.product_email_cnt);
router.get('/get_distinct_brand', product.distinct_brand);
router.get('/get_distinct_price', product.distinct_price);
router.get('/get_distinct_color', product.distinct_color);
router.get('/get_distinct_discount', product.distinct_discount);
router.delete('/delete_product', product.delete_product);
router.get('/get_similar_product', product.similar_prod);
router.patch('/update_rating_product', uenc, product.upd_rating);
router.patch('/update_item_stock_product', uenc, product.upd_prod_item_stock);
router.patch('/edit_product', image_upload.array('image1'), product.edit_admin_product)
router.patch('/vendor_edit_product', image_upload.array('image1'), product.edit_vendor_product);

//removd product details
router.post('/removed_product', uenc, delete_detail.remove_product);
router.post('/vendor_removed_product', uenc, delete_detail.removed_by_vendor);
router.get('/removed_product_cnt', delete_detail.removed_product_cnt);

//Deal List details
router.get('/dealoftheday', deal.get_deal);
router.get('/get_deal', deal.dl_list);
router.get('/get_deal_count', deal.deal_count);
router.delete('/delete_deal', deal.deal_delete_all);
router.delete('/delete_deal_data', deal.deal_delete_single);

const add_deal = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/deal_list')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const deal_list_multer = multer({
    storage: add_deal
})
router.post('/add_deal', deal_list_multer.single('deal_image'), deal.add_deal);

//add category to bag
const add_category = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/category_list')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const category_list_multer = multer({
    storage: add_category
})
router.post('/add_categorytobag', category_list_multer.single('category_image'), category_to_bag.add_cattobag);
router.get('/categorytobag', category_to_bag.list)
router.get('/get_cattobag', category_to_bag.cattobag);
router.get('/get_cat_to_bag_count', category_to_bag.count);
router.delete('/delete_category_to_bag', category_to_bag.all);
router.delete('/delete_category_to_bag_data', category_to_bag.single);


//add best buys
const add_bestbuys = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/bestbuys_list')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const bestbuys_list_multer = multer({
    storage: add_bestbuys
})
router.post('/add_bestbuys', bestbuys_list_multer.single('bestbuys_image'), best_buys.add_bestbuys)
router.get('/bestbuys', best_buys.bestbuys)
router.get('/get_bestbuys_list', best_buys.buys_list)
router.get('/get_bestbuys_count', best_buys.count);
router.delete('/delete_best_buys', best_buys.delete_all)
router.delete('/delete_best_buys_data', best_buys.delete_single)

//slider details
const add_slider = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/slider_list')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const slider_list_multer = multer({
    storage: add_slider
})
router.post('/add_slider', slider_list_multer.single('slider_image'), slider.add_slider);
router.get('/slider_products', slider.slider_all)
router.get('/get_slider', slider.slider);
router.get('/get_slider_image', slider.slider_image)
router.get('/get_slider_count', slider.count);
router.delete('/delete_slider', slider.all);
router.delete('/delete_slider_data', slider.single);


//vendor slider images
const vendorlandimg = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/vendor_land')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const vendorlandcart = multer({
    storage: vendorlandimg
})

router.post('/add_vendor_slider', vendorlandcart.single('landimg'), vendor_landing.add_det);
router.get('/get_vendorland_cnt', vendor_landing.count);
router.get('/get_all_vendorland', vendor_landing.alldetails);
router.delete('/delete_vendorland_imgid', vendor_landing.single);
router.delete('/delete_all_vendorland', vendor_landing.all);

//admin additional details.
router.post('/add_adminadd_det', uenc, admin_add_det.add_det);
router.patch('/edit_adminadd_det', uenc, admin_add_det.edit_det)
router.get('/get_admin_add_det', admin_add_det.get_det);

//Top Picks details
router.get('/toppick', top_picks.toppicks);
router.get('/get_toppick', top_picks.list);
router.get('/get_toppick_count', top_picks.count)
router.delete('/delete_toppick_data', top_picks.single)
router.delete('/delete_toppick', top_picks.all);

//add top picks
const add_toppick = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/toppick_list')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const toppick_list_multer = multer({
    storage: add_toppick
})
router.post('/add_toppicks', toppick_list_multer.single('picks_image'), top_picks.add_det)

///////////////////////////  USER DETAILS ////////////////////////////////////

//user signup details.
const user_verifyToken = (req, res, next) => {
    jwt.verify(req.headers['user_key'], process.env.JWT_SECRET_KEY, (err, token) => {
        if (err)
            res.json({ 'error': '401 Not Authenticated' });
        else
            next();
    })
}

router.get('/user_details', user_signup.all_users)
router.get('/get_user_cnt', user_signup.user_count);
router.post('/user_login_signup', uenc, user_signup.login_signup);
router.post('/mail_userpwd', uenc, user_signup.temp_pwd);
router.post('/senduser_resetpwd', uenc, user_signup.reset_user_pwd);
router.patch('/user_signup', uenc, user_signup.change_user_pwd);
router.patch('/user_signup_edit', uenc, user_signup.edit_det);
router.post('/user_login', uenc, user_signup.user_login);
router.delete('/delete_user', user_signup.delete_user);
const user_profile = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/user_profile')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const user_multer = multer({
    storage: user_profile
})
router.post('/user_signup', user_multer.single('user_profile'), user_signup.add_user);

//removed user list
router.post('/removed_user', uenc, delete_detail.remove_user);
router.get('/removed_user_cnt', delete_detail.removed_user_count);

//user wishlist details
const user_wish = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/user_wish')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const user_wish_multer = multer({
    storage: user_wish
})

router.post('/add_user_wishlist', user_wish_multer.single('user_wish'), user_wishlist.add_wishlist);
router.get('/get_wishlist', user_wishlist.wishlist_userid);
router.get('/get_wishlist_pid', user_wishlist.wishlist_userid_pid);
router.get('/get_wishlist_all', user_wishlist.wishlist_all);
router.get('/get_wishlist_user', user_wishlist.wishlist_count)
router.delete('/delete_wishlist', user_wishlist.delete_wishlist);
router.delete('/delete_all_wishlist', user_wishlist.delete_all);
router.patch('/update_item_stock_wishlist', uenc, user_wishlist.update_wishlist_itemstock);

//Cart Details
const cart = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/cart')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const usercart = multer({
    storage: cart
})
//add to cart
router.post('/add_cart', usercart.single('cart'), user_cart.add_cart)
router.get('/get_cart', user_cart.get_cart);
router.get('/get_cart_pid', user_cart.get_pid_userid);
router.get('/get_cart_count', user_cart.count);
router.delete('/delete_cart_pid', user_cart.delete_cart);
router.delete('/delete_all_cart', user_cart.delete_all_cart);
router.patch('/update_item_stock_cart', uenc, user_cart.cart_upd_itemstock);

//Gift Details
router.post('/add_gift_wrap', uenc, user_gift.add_gift);
router.put('/edit_gift_wrap', uenc, user_gift.edit_gift)
router.delete('/delete_gift_wrap', user_gift.delete_gift);
router.get('/get_gift_wrap', user_gift.get_gift);

//Address details.
router.post('/add_addr_pincode', uenc, user_addr.add_pincode);
router.post('/add_addr', uenc, user_addr.add_fulldet);
router.get('/get_addr', user_addr.get_adr_userid);
router.get('/get_new_adr', user_addr.latest_addr);
router.get('/get_addr_count', user_addr.count);
router.put('/edit_addr_pincode', uenc, user_addr.edit_pincode);
router.put('/edit_addr', uenc, user_addr.edit_addr);
router.delete('/delete_adr_adrid', user_addr.delete_addr);
router.delete('/delete_all_addr', user_addr.delete_all_addr);

//final del addr
router.get('/get_del_adr', user_addr.get_del_addr);
router.post('/add_del_adr', uenc, user_addr.add_del_addr);
router.delete('/delete_del_adr', user_addr.delete_del_addr);
router.delete('/delete_all_del_adr', user_addr.delete_all_del_addr);

//place order for Address details.
const orderimg = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/orderimg')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const orderimgcart = multer({
    storage: orderimg
})

router.post('/place_order', orderimgcart.single('orderimg'), place_order.add_placeorder);
router.get('/get_place_order', place_order.get_placeorder);
router.delete('/delete_place_order', place_order.delete_order);
router.patch('/update_item_stock_placeorder', uenc, place_order.upd_placeorder_itemstock)

//amount details.
router.post('/add_amount', uenc, user_amount.add_amount);
router.get('/get_amount', user_amount.get_amount);
router.delete('/delete_amount', user_amount.delete_amount);

//user additional details

router.get('/user_add_det', user_verifyToken, user_add_det.get_det);
router.post('/add_extra_details', uenc, user_add_det.add_det);
router.put('/edit_extra_details', uenc, user_add_det.edit_det);
router.delete('/delete_add_user_det', uenc, user_add_det.delete_det);

//subscription details.
router.get('/get_subscription', subscription.get_det)
router.post('/add_subscription', uenc, subscription.add_sub);
router.put('/edit_subscription', uenc, subscription.delete_sub);
router.delete('/delete_subscription', uenc, subscription.remove_sub);

//Order Details
router.get('/order_count', user_order.count);
router.get('/get_order', user_order.get_order);
router.get('/get_unique_order', user_order.unique_order)
router.get('/order_status_cnt', user_order.order_status_cnt);
router.patch('/update_order_status', uenc, user_order.upd_order_status)
router.get('/get_order_count', user_order.get_ord_cnt);
router.get('/get_total_amount', user_order.sales_amt);
router.patch('/update_item_stock_order', uenc, user_order.upd_order_itemstock);

//create order
const paymentimg = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/payment_order')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const payment_multer = multer({
    storage: paymentimg
})
router.post('/create_order', payment_multer.single('paymentimage'), user_order.create_order)

//send order confirmation mail:
router.post('/send_order_confirm', uenc, (req, res) => {
    const message = {
        from: process.env.user_name,
        to: req.body.usermail,
        subject: `Your Myntra order #${req.body.orderid} of ${req.body.total_items} items`,
        html: `<a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Account</a> | <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Myntra.com</a>
        <br></br>
        <hr/>
        Order Confirmation - Order #${req.body.orderid}
        <br></br>
        Hello ${req.body.username},
        <br/>
        Thank you for your order. We’ll send a confirmation when your order ships. If you would like to view the status of your order or make any changes to it, please visit <a target='_blank' href='https://kiruthiga-12-myntra-clone-frontend.onrender.com'>Your Orders</a> on Myntra.
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
    transport.sendMail(message, (err, info) => {
        if (err)
            res.json({ Error: err.message })
        else
            res.send({ 'msg': 'success' })
    })
})

//payment page
router.post('/payment_redirect', uenc, async (req, res) => {
    const customer = await stripe.customers.create({
        email: req.body.email,
        name: req.body.name
    });
    const payment_method = await stripe.paymentIntents.create({
        amount: req.body.total_amount * 100,
        currency: "inr",
        customer: customer.id,
        payment_method_types: ['card']
    })
        .then((data) => {
            res.send({
                clientSecret: data.client_secret,
            });
        })
        .catch((error) => res.json({ Error: error.message }))
})

//review comments
router.post('/add_review', uenc, user_refund.add_comment);
router.get('/get_review', user_refund.get_comments);
router.get('/get_review_count', user_refund.comments_count);
router.get('/get_average_rating', user_refund.avg_rating);
router.get('/get_rating_progress', user_refund.rating);


// user refund details
router.post('/add_user_refund', uenc, user_refund.add_refund)
router.get('/get_user_refund', user_refund.get_refund)

/////////////////////////// VENDOR DETAILS //////////////////////

//vendor signup details.
const vendor_verifyToken = (req, res, next) => {
    jwt.verify(req.headers['vendor_key'], process.env.JWT_SECRET_KEY, (err, token) => {
        if (err)
            res.json({ 'error': '401 Not Authenticated' });
        else
            next();
    })
}
router.patch('/vendor_signup', uenc, vendor_signup.change_password)
router.patch('/vendor_editprofile', uenc, vendor_signup.edit_det);
router.get('/vendor_details', vendor_signup.vendor_det);
router.get('/vendor_detail_email', vendor_verifyToken, vendor_signup.vendor_det_email);
router.delete('/delete_vendor', vendor_signup.delete_vendor);
router.get('/get_vendor_cnt', vendor_signup.count);
router.post('/vendor_login', uenc, vendor_signup.login);
router.post('/vendor_reset_mailpwd', uenc, vendor_signup.reset_link);

const vendor_profile = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/vendor_profile')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)
const vendor_multer = multer({
    storage: vendor_profile
})
router.post('/vendor_signup', vendor_multer.single('vendor_profile'), vendor_signup.add_vendor);

//Vendor Status details
router.get('/get_vendor_approvedcnt', vendor_status.count);
router.post('/vendor_status', uenc, vendor_status.create_status);
router.put('/vendor_status', uenc, vendor_status.edit_status);
router.get('/vendordetails_status', vendor_status.get_status);
router.delete('/delete_vendor_status', vendor_status.delete_status);
router.get('/vendor_status_email', vendor_status.get_email);
router.post('/vendor_otp_register', uenc, vendor_status.create_otp);
router.post('/vendor_otp_compare', uenc, vendor_status.otp_compare);
router.delete('/delete_vendor_otp', vendor_status.delete_otp);

//Vendor Registeration 
//step1 GST :
router.post('/gst_details', uenc, gst.add_gst);
router.put('/gst_details', uenc, gst.edit_gst);
router.get('/gst_getdetails_email', gst.get_gst);
router.delete('/delete_vendor_gst', gst.delete_gst);

//step2 Basic Contact
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/signature')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var signature_upload = multer(
    {
        storage: storage
    }
)
router.post('/basic_contact', signature_upload.single('signature'), bc.add_basic_contact);
router.put('/basic_contact', signature_upload.single('signature'), bc.edit_basic_contact);
router.get('/basic_contact_email', bc.get_det)
router.delete('/delete_vendor_basiccontact', bc.delete);

//step 3 Warehouse Details
router.post('/warehouse_details', uenc, wh.add_wh);
router.put('/warehouse_details', uenc, wh.edit_wh);
router.get('/warehouse_email', wh.get_det);
router.get('/warehouse_det', wh.get_whno);
router.delete('/delete_vendor_warehouse', wh.delete_wh);

//step 4 Bank Details
router.post('/bank_details', uenc, bank.add_det);
router.put('/bank_details', uenc, bank.edit_det);
router.get('/bankdetails_email', bank.get_det);
router.delete('/delete_vendor_bank', bank.delete_det);

//step 5 Brand Details
const brand_storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/brand_logo')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }
)
const brandlogo_upload = multer({
    storage: brand_storage
})
router.post('/brand_details', brandlogo_upload.single('brand_logo'), brand.add_brand);
router.put('/brand_details', brandlogo_upload.single('brand_logo'), brand.edit_brand);
router.get('/branddetails_email', brand.get_alldet);
router.get('/brand_details', brand.get_email);
router.delete('/delete_vendor_brand', brand.delete_brand);

//final step
router.post('/declaration', uenc, decl.add_det)
router.put('/declaration', uenc, decl.edit_det);
router.get('/declaration_email', decl.get_det);
router.delete('/delete_vendor_declaration', decl.delete_det);

//percentage
router.post('/percentage', uenc, vendor_status.create_perc);
router.put('/percentage_update', uenc, vendor_status.edit_perc);
router.get('/percentage_email', vendor_status.email_perc);
router.delete('/percentage_delete', vendor_status.delete_perc);

//removd vendor details
router.post('/removed_vendor', uenc, delete_detail.remove_vendor);
router.get('/removed_vendor_cnt', delete_detail.removed_vendor_cnt);

//vendor additional details.
router.post('/add_vendoradd_det', uenc, vendor_add_det.add_det)
router.patch('/edit_vendoradd_det', uenc, vendor_add_det.edit_det)
router.get('/get_vendor_add_det', vendor_add_det.get_det);
router.delete('/delete_vendor_add_det', vendor_add_det.delete_det);

//vendor_payment
router.post('/add_vendor_payment', uenc, vendor_payment.add_payment)
router.get('/get_vendor_payment', vendor_payment.get_det);
router.get('/vendor_sales_amount', vendor_payment.sales_amount);

module.exports = router;

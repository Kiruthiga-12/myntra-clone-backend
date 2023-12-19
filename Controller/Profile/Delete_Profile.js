const fs = require('fs');
const path = require('path');
//abs path 
const abspath = process.cwd();
//delete user profile
exports.user_profile = (req, res) => {
    fs.readdir('uploads/user_profile', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/user_profile/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })
}

//delete admin profile
exports.admin_profile = (req, res) => {
    fs.readdir('uploads/admin_profile', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/admin_profile/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })

}
//delete vendor profile
exports.vendor_profile = (req, res) => {
    fs.readdir('uploads/vendor_profile', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/vendor_profile/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })

}
//delete vendor_signature
exports.vendor_signature = (req, res) => {
    fs.readdir('uploads/signature', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/signature/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })

}
//delete vendor brand_logo
exports.vendor_brand_logo = (req, res) => {
    fs.readdir('uploads/brand_logo', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/brand_logo/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })
}
//delete product images
exports.product_profile = (req, res) => {
    fs.readdir('uploads/images', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/images/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })

}
//delete wishlist
exports.wishlist_profile = (req, res) => {
    fs.readdir('uploads/user_wish', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/user_wish/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })

}
//delete deal_list
exports.deal_list = (req, res) => {
    fs.readdir('uploads/deal_list', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/deal_list/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })

}
//cat to bag
exports.cattobag_list = (req, res) => {
    fs.readdir('uploads/category_list', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/category_list/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })
}

//best buys list
exports.buys_list = (req, res) => {
    fs.readdir('uploads/bestbuys_list', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/bestbuys_list/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })
}
//slider list
exports.slider_list = (req, res) => {
    fs.readdir('uploads/slider_list', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/slider_list/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })
}
//cart profile
exports.cart_profile = (req, res) => {
    fs.readdir('uploads/cart', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/cart/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })

}
//place order img
exports.placeorder = (req, res) => {
    fs.readdir('uploads/orderimg', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/orderimg/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })

}
//vendor land img
exports.vendorland_list = (req, res) => {
    fs.readdir('uploads/vendor_land', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/vendor_land/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })

}

//order profile
exports.order_profile = (req, res) => {
    fs.readdir('uploads/payment_order', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/payment_order/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })

}
//top picks profile
exports.toppick_list = (req, res) => {
    fs.readdir('uploads/toppick_list', (err, files) => {
        if (err) {
            res.json({ 'error': error })
        }
        else {
            files.forEach(file => {
                const fileDir = path.join(abspath, 'uploads/toppick_list/', file);
                if (file !== 'specialfile.txt') {
                    fs.unlinkSync(fileDir);
                }
            });
            res.json({ 'msg': 'success' })
        }
    })
}
const orderModel = require('../models/orderModel')
const productModel = require('../models/productModel')

// POST order using API and their url = /api/v1/order
exports.createOrder = async (req, res, next) => {

    //reduce() => it is used to reduce the objects in array and join in single array 
    const cartItems = req.body
    const amount = Number(cartItems.reduce((acc, items) => (acc + items.product.price * items.qty), 0)).toFixed(2) //acc is acculamatory it is a previous amount to store in the amount
    const status = 'pending..'
    const order = await orderModel.create({ cartItems, amount, status })

    //update the stock in the database

    cartItems.forEach(async (item) => {
        const product = await productModel.findById(item.product._id);
        product.stock = product.stock - item.qty;
        await product.save()
    });

    res.json({
        success: true,
        order
    })
}
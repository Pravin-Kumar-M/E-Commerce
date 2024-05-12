const ProductModel = require('../models/productModel')


//GET product using API and their url = /api/v1/products

exports.getProducts = async (req, res, next) => {

    //search the value and get it:

    const query = req.query.keyword ? {
        name: {
            //regex = regular expression,
            //$regex is used to filer and the option is used for case-sensitive like [A-Z,a-z]
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const products = await ProductModel.find(query)

    res.json({
        success: true,
        products
    })
}

// GET 'Single-product' using API and their url = /api/v1/products/:id

exports.getSingleProducts = async (req, res, next) => {

    try {

        const product = await ProductModel.findById(req.params.id)
        res.json({
            success: true,
            product
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Unable to get the id'
        })

    }
}
const mongoose = require('mongoose')
const Product = require('../../models/product')
const ProductNormalizer = require('../../normalizers/products/product-normalizer');

module.exports.all = function(req, res) {
    console.log("all")
    Product.find()
        .select('name price _id')
        .exec()
        .then(products => {
            res.status(200).json({
                message: 'List of all products',
                total: products.length,
                products: products.map(product => {
                    return ProductNormalizer.normalize(product)
                })
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

module.exports.get = function(req, res) {
    console.log('get')
    Product.findById(req.params.id)
        .select('name price _id')
        .exec()
        .then(product => {
            product ? res.status(201).json({
                message: "Get product by id",
                product: ProductNormalizer.normalize(product)
            }) : res.status(404).json({
                message: 'Product not found'
            })
        })
        .catch(error => {
            res.status(500).json({error: error})
        })
}

module.exports.create = function(req, res) {
    console.log('create')
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    })

    product.save()
        .then(() => {
            res.status(201).json({
                message: 'Product created successfully',
                product: ProductNormalizer.normalize(product)
            })
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })
}

module.exports.patch = function(req, res) {
    console.log('patch')
    const updateOps = {};
    
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Product.update({ _id: req.params.id}, { $set: updateOps })
        .exec()
        .then(() => {
            res.status(200).json({
                message: "Product updated successfully",
                product_id: req.params.id,
                request: {
                    type: "GET",
                    url: process.env.DEFAULT_SERVICE_DOMAIN + 
                    "/products/" + req.params.id
                }
            })
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })
}

module.exports.delete = function(req, res) {
    console.log('delete')
    Product.deleteOne({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product deleted successfully",
                id: req.params.id
            })
        })
        .catch(error => {
            res.status(500).json({error: error})
        })
}
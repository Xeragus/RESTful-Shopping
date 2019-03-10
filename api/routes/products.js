const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require('mongoose')
const ProductNormalizer = require('../normalizers/products/product-normalizer');

router.get('/', (request, response, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(products => {
            response.status(200).json({
                message: 'List of all products',
                total: products.length,
                products: products.map(product => {
                    return ProductNormalizer.normalize(product)
                })
            })
        })
        .catch(error => {
            response.status(500).json({
                error: error
            })
        })
})

router.post('/', (request, response, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: request.body.name,
        price: request.body.price
    })

    product.save()
        .then(() => {
            response.status(201).json({
                message: 'Product created successfully',
                product: ProductNormalizer.normalize(product)
            })
        })
        .catch(error => {
            response.status(500).json({ error: error })
        }) 
})

router.get('/:id', (request, response, next) => {
    Product.findById(request.params.id)
        .select('name price _id')
        .exec()
        .then(product => {
            product ? response.status(201).json({
                message: "Get product by id",
                product: ProductNormalizer.normalize(product)
            }) : response.status(404).json({
                message: 'Product not found'
            })
        })
        .catch(error => {
            response.status(500).json({error: error})
        })
})

router.patch('/:id', (request, response, next) => {
    const updateOps = {};
    
    for(const ops of request.body) {
        updateOps[ops.propName] = ops.value
    }

    Product.update({ _id: request.params.id}, { $set: updateOps })
        .exec()
        .then(() => {
            response.status(200).json({
                message: "Product updated successfully",
                product_id: request.params.id,
                request: {
                    type: "GET",
                    url: process.env.DEFAULT_SERVICE_DOMAIN + 
                    "/products/" + request.params.id
                }
            })
        })
        .catch(error => {
            response.status(500).json({ error: error })
        })
})

router.delete('/:id', (request, response, next) => {
    Product.remove({_id: request.params.id})
        .exec()
        .then(result => {
            response.status(200).json({
                message: "Product deleted successfully",
                id: request.params.id
            })
        })
        .catch(error => {
            response.status(500).json({error: error})
        })
}) 

module.exports = router
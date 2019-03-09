const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require('mongoose')

router.get('/', (request, response, next) => {
    Product.find()
        .exec()
        .then(products => {
            response.status(200).json({
                message: 'Handling a GET request to /products',
                products: products
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

    product.save().then(result => {
        response.status(201).json({
            message: 'Handling a POST request to /products',
            product: product
        })
    }).catch(error => {
        response.status(500).json({
            message: 'Handling a POST request to /products',
            error: error
        })
    }) 
})

router.get('/:id', (request, response, next) => {
    Product.findById(request.params.id)
        .exec()
        .then(doc => {
            doc ? response.status(201).json(doc) : response.status(404).json({
                message: 'No product id matches the provided id'
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
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => {
            console.log(error)
            response.status(500).json({ error: error })
        })
})

router.delete('/:id', (request, response, next) => {
    Product.remove({_id: request.params.id})
        .exec()
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => {
            response.status(500).json({error: error})
        })
}) 

module.exports = router
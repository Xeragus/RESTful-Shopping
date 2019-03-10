const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')
const OrderNormalizer = require('../normalizers/orders/order-normalizer')

router.get('/', (request, response, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product')
        .exec()
        .then(orders => {
            response.status(200).json({
                message: "List of all orders",
                total: orders.length,
                orders: orders.map(order => {
                    // return OrderNormalizer.normalize(order)
                    return {
                        product: order.product,
                        quantity: order.quantity,
                        request: {
                            type: "GET",
                            url: process.env.DEFAULT_SERVICE_DOMAIN + 
                            "/orders/" + order._id
                        }
                    }
                })
            })
        })
        .catch(error => {
            response.status(500).json({
                error: error
            })
        })
})

router.get('/:id', (request, response, next) => {
    Order.findById(request.params.id)
        .select('product quantity _id')
        .exec()
        .then(order => {
            order ? response.status(200).json({
                message: "Get order by id",
                order: {
                    product: order.product,
                    quantity: order.quantity,
                    request: {
                        type: "GET",
                        url: process.env.DEFAULT_SERVICE_DOMAIN + 
                        "/order/" + order._id
                    }
                }
            }) : response.status(404).json({
                message: "No order found"
            })
        })
        .catch(error => {
            response.status(500).json({
                error: error
            })
        })
})

router.post('/', (request, response, next) => {
    Product.findById(request.body.product_id)
        .then(product => {
            if (!product) {
                return response.status(404).json({
                    message: "Product not found"
                })
            }

            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: request.body.product_id,
                quantity: request.body.quantity
            }) 
        
            return order.save()
        })
        .then(order => {
            response.status(201).json({
                message: "Order created successfully",
                // order: OrderNormalizer.normalize(order)
                order: {
                    product_id: order.product,
                    quantity: order.quantity,
                    request: {
                        type: "GET",
                        url: process.env.DEFAULT_SERVICE_DOMAIN + 
                            "/orders/" + order._id
                    }
                }
            })
        })
        .catch(error => {
            response.status(500).json({
                error: error
            })
        })
})

router.delete('/:id', (request, response, next) => {
    Order.remove({ _id: request.params.id })
        .exec()
        .then(() => {
            response.status(200).json({
                message: "Order deleted successfully"
            })
        })
        .catch(error => {
            response.status(500).json({
                error: error
            })
        })
})

module.exports = router
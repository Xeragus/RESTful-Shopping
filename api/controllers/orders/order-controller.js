const mongoose = require('mongoose')
const Order = require('../../models/order')
const Product = require('../../models/product')
const OrderNormalizer = require('../../normalizers/orders/order-normalizer')

module.exports.all = function(req, res) {
    Order.find()
    .select('product quantity _id')
    .populate('product')
    .exec()
    .then(orders => {
        res.status(200).json({
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
        res.status(500).json({
            error: error
        })
    })
}

module.exports.get = function(req, res) {
    Order.findById(req.params.id)
        .select('product quantity _id')
        .exec()
        .then(order => {
            order ? res.status(200).json({
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
            }) : res.status(404).json({
                message: "No order found"
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

module.exports.create = function(req, res) {
    Product.findById(req.body.product_id)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                })
            }

            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.product_id,
                quantity: req.body.quantity
            }) 
        
            return order.save()
        })
        .then(order => {
            res.status(201).json({
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
            res.status(500).json({
                error: error
            })
        })
}

module.exports.delete = function(req, res) {
    Order.deleteOne({ _id: req.params.id })
        .exec()
        .then(() => {
            res.status(200).json({
                message: "Order deleted successfully"
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}
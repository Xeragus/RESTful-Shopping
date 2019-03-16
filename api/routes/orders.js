const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/orders/order-controller')

router.get('/', OrderController.all)
router.get('/:id', OrderController.get)
router.post('/', OrderController.create)
router.delete('/:id', OrderController.delete)

module.exports = router
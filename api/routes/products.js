const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product/product-controller')

router.get('/', ProductController.all)
router.post('/', ProductController.create)
router.get('/:id', ProductController.get)
router.patch('/:id', ProductController.patch)
router.delete('/:id', ProductController.delete) 

module.exports = router
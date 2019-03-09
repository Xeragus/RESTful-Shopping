const express = require('express')
const router = express.Router()

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling a GET request to /products'
    })
})

router.post('/', (request, response, next) => {
    const product = {
        name: request.body.name,
        price: request.body.price
    }

    response.status(201).json({
        message: 'Handling a POST request to /products',
        product: product
    })
})

router.get('/:id', (request, response, next) => {
    response.status(200).json({
        message: 'Handling a GET request to /products/:id'
    })
})

router.patch('/:id', (request, response, next) => {
    response.status(200).json({
        message: 'Handling a PATCH request to /products/:id'
    })
})

router.delete('/:id', (request, response, next) => {
    response.status(200).json({
        message: 'Handling a DELETE request to /products/:id'
    })
}) 

module.exports = router
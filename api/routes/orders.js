const express = require('express')
const router = express.Router()

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling a GET request to /orders'
    })
})

router.get('/:id', (request, response, next) => {
    response.status(200).json({
        message: 'Handling a GET request to /orders/:id',
        id: request.params.id
    })
})

router.post('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling a POST request to /orders'
    })
})

module.exports = router
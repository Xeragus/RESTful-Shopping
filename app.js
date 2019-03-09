const express = require('express')
const app = express()
const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')
const morgan = require('morgan')

app.use(morgan('dev'))

app.use('/products', productRoutes)
app.use('/orders', ordersRoutes)

app.use((request, response, next) => {
    const error = new Error('Not found')

    error.status = 404
    next(error)
})

app.use((error, request, response, next) => {
    response.status(error.status || 500)
            .json({
            error: {
                message: error.message
            }
    })
})

module.exports = app
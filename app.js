const express = require('express')
const app = express()
const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
            .header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')

        return response.status(200).json({})
    }
})

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
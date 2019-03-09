const express = require('express')
const app = express()
const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// DB connection
mongoose.connect(
    'mongodb+srv://' + 
    process.env.MONGO_ATLAS_USERNAME + `:` + 
    process.env.MONGO_ATLAS_PASSWORD + 
    '@restful-shopping-ngbhd.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
)

app.use(morgan('dev'))

// request body parser
app.use(bodyParser.urlencoded({
    extended: false
})).use(bodyParser.json())

// CORS handler
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')

        return response.status(200).json({})
    }

    next()
})

app.use('/products', productRoutes)
app.use('/orders', ordersRoutes)

// error handling
app.use((request, response, next) => {
    const error = new Error('Not found')

    error.status = 404
    next(error)
    }).use((error, request, response, next) => {
        response.status(error.status || 500)
            .json({
            error: {
                message: error.message
            }
        })
    })

module.exports = app
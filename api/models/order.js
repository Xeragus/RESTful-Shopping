const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    product: {
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId
    },
    quantity: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Order', orderSchema)
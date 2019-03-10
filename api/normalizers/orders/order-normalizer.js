const Product = require('../../models/product')
const ProductNormalizer = require('../products/product-normalizer')

module.exports = {
    normalize: function(order) {
        product = Product.findById(order.product)
            .select('name price _id')
            .exec()
            .then(product => {
                return {
                    // request: {
                    //     type: "GET",
                    //     url: process.env.DEFAULT_SERVICE_DOMAIN + 
                    //     "/orders/" + order._id
                    // },
                    quantity: order.quantity,
                    // product: ProductNormalizer.normalize(product)
                }
            })
            .catch(error => {
                return {
                    error: error
                }
            })
    }
}
module.exports = {
    normalize: function(product) {
        return {
            name: product.name,
            price: product.price,
            company: product.company,
            request: {
                type: "GET",
                url: process.env.DEFAULT_SERVICE_DOMAIN + "/products/" + product._id
            },
        }
    }
}
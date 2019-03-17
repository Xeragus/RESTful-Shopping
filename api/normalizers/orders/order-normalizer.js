module.exports = {
    normalize: function(order) {
        return {
            id: order._id,
            product: order.product,
            quantity: order.quantity,
            request: {
                type: "GET",
                url: process.env.DEFAULT_SERVICE_DOMAIN + 
                "/orders/" + order._id
            },
        }
    }
}
const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Company', companySchema)
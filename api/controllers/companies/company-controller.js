const Company = require('../../models/company')
const mongoose = require('mongoose')

module.exports.all = function(req, res) {
    Company.find()
        .exec()
        .then(companies => {
            res.status(200).json({
                message: "List of all companies",
                total: companies.length,
                companies: companies.map(company => {
                    return company
                })
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

module.exports.create = function(req, res) {
    const company = new Company({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        address: req.body.address
    })

    company.save()
        .then(() => {
            res.status(201).json({
                message: "Company created successfully",
                company: company
            })
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })
}
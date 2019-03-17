const express = require('express')
const router = express.Router()
const CompanyController = require('../controllers/companies/company-controller')

router.get('/', CompanyController.all)
router.post('/', CompanyController.create)

module.exports = router
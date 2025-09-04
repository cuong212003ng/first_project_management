const express = require('express')
const router = express.Router()

const productController = require('../../controllers/admin/product.controller')

router.get('/', productController.product)
router.patch('/change-status/:status/:id', productController.changeStatus)
// router.post('/change-status/:status/:id', productController.changeStatus)

module.exports = router
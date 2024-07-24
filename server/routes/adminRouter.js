const Router = require('express')
const adminController = require('../controllers/adminController')
const productController = require('../controllers/productController')
const router = new Router()


router.get('/users', adminController.getUsers)
// router.get('/products', adminController.getProducts)
// router.get('/orders', adminController.getOrders)
// router.get('/products-in-order', adminController.getProductsInOrder)

// router.put('/update-role', adminController.updateRole)
// router.put('/change-order-status', adminController.updateStatusOrder)

// router.delete('/delete-user', adminController.deleteUser)

router.post('/create-product', productController.createProduct)


module.exports = router
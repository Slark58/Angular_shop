const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
// const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOne)


module.exports = router
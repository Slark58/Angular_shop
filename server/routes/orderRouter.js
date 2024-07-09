const Router = require('express')
const orderController = require('../controllers/orderController')
// const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()


router.post('/create', orderController.createOrder)
router.get('/getAll', orderController.getAllOrdersById)
router.get('/getOne', orderController.getOneOrdersById)


module.exports = router
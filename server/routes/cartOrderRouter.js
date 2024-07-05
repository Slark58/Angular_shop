const Router = require('express')
const cartOrderController = require('../controllers/cartOrderController')
const router = new Router()


router.get('/all', cartOrderController.getAllCartItems)
router.get('/one', cartOrderController.getOneCartItem)

router.post('/increase', cartOrderController.increaseCartOrdersItem)
router.post('/decrease', cartOrderController.decreaseCartOrdersItem)

router.delete('/delete', cartOrderController.deleteCartOrdersItems)
router.delete('/clear', cartOrderController.clearBasket)


module.exports = router
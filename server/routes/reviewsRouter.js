const Router = require('express')
const router = new Router()
const reviewsController = require('../controllers/reviewsController')

router.get('/getAll', reviewsController.getAll)

module.exports = router
const Router = require('express')
const router = new Router()
const reviewsController = require('../controllers/reviewsController')

router.get('/getAll', reviewsController.getAll)
router.post('/create', reviewsController.createReview)

module.exports = router
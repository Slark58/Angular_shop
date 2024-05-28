const Router = require('express')
const filtersController = require('../controllers/filtersController')
// const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()


router.get('/', filtersController.getAllFilters)


module.exports = router
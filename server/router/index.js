const Router = require('koa-router')
const GlobalDataController = require('../controllers/global-data.controller')
const PagesController = require('../controllers/pages.controller')

const router = new Router({
  prefix: '/fake-api'
})

/**
 *  Global data route
 */

router.get('/global-data', GlobalDataController.get)

/**
 *  All other routes
 */

router.get('*', PagesController.get)

module.exports = router

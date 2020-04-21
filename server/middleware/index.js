const storage = require('./storage')
const redirects = require('./redirects')
const extendHeaders = require('./extend-headers')

module.exports = function (app) {
  app.use(redirects)
  app.use(storage)
  app.use(extendHeaders)
}

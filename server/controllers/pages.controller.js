const fs = require('fs')
const { DB_PATH } = require('../config')
const getLang = require('../utils/get-lang')

/**
 * Get page data from json "database"
 * @param ctx
 */

exports.get = function (ctx) {
  const lang = getLang(ctx)  
  const path = ctx.path.replace('fake-api', lang)

  try {
    const data = fs.readFileSync(DB_PATH + path + '/index.json', 'utf8')

    ctx.status = 200
    ctx.body = JSON.parse(data)
  } catch (e) {
    ctx.status = 404
    ctx.set('fake-api', true)
    ctx.body = 'Page not found. Check ' + DB_PATH + path + '/index.json'
  }
}

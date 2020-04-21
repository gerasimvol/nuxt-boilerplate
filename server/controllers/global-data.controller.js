const fs = require('fs')
const { DB_PATH } = require('../config')
const getLang = require('../utils/get-lang')

/**
 * Get global data from json "database"
 * @param ctx
 */

exports.get = function (ctx) {
  const lang = getLang(ctx)

  try {
    const locales = fs.readFileSync(DB_PATH + '/locales/index.json', 'utf8')
    let globalData = fs.readFileSync(DB_PATH + '/' + lang + '/global/index.json', 'utf8')

    // get global data for requested locale
    globalData = JSON.parse(globalData)

    // set value for locale 'current' key
    globalData.locales = JSON.parse(locales).map(locale => ({
      ...locale,
      current: lang === locale.code
    }))

    ctx.status = 200
    ctx.body = globalData
  } catch (err) {
    console.err(err)
  }
}

const toPascalCase = require('to-pascal-case')
const UAParser = require('ua-parser-js')

// add custom headers
module.exports = async (ctx, next) => {
  // res header 'origin'
  ctx.set('origin', ctx.request.origin)

  // res header 'parsed-user-agent'
  const uaParser = new UAParser().setUA(ctx.request.headers['user-agent'])
  const parsedUserAgent = { browsers: {}, os: {} }
  const setKey = (name = '') => 'is' + toPascalCase(name)
  parsedUserAgent.browsers[setKey(uaParser.getBrowser().name)] = true
  parsedUserAgent.os[setKey(uaParser.getOS().name)] = true
  ctx.set('parsed-user-agent', JSON.stringify(parsedUserAgent))

  await next()
}

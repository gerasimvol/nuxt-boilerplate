const toPascalCase = require('to-pascal-case')
const UAParser = require('ua-parser-js')

export default function (req, res, next) {
  // res header 'origin'
  const origin = req.headers.referer || `http://${req.headers.host}`
  res.setHeader('origin', origin)

  // res header 'parsed-user-agent'
  const uaParser = new UAParser().setUA(req.headers['user-agent'])
  const parsedUserAgent = { browsers: {}, os: {} }
  const setKey = (name = '') => 'is' + toPascalCase(name)
  parsedUserAgent.browsers[setKey(uaParser.getBrowser().name)] = true
  parsedUserAgent.os[setKey(uaParser.getOS().name)] = true
  res.setHeader('parsed-user-agent', JSON.stringify(parsedUserAgent))

  next()
}

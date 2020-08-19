const request = require('request')

module.exports = async (ctx, next) => {
  // return for production
  if (process.env.NODE_ENV === 'production') {
    await next()
    return
  }

  // load static files by piping stream to API_URL
  if (new RegExp(`^${process.env.STORAGE_PREFIX}`).test(ctx.req.url)) {
    ctx.body = ctx.req.pipe(request(`${process.env.API_URL}${ctx.req.url}`))
  } else {
    await next()
  }
}

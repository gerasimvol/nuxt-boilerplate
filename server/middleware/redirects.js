const redirectToPath = require('../utils/path-for-redirect').default

module.exports = async (ctx, next) => {
  const path = redirectToPath(ctx.request.url)
  const { origin } = ctx.request

  switch (true) {
  case /\/\/www/.test(origin):
    // redirect from www to no-www
    return ctx.redirect(origin.replace('www.', '') + ctx.request.url)
  }

  if (path) {
    ctx.status = 301
    ctx.redirect(path)
  } else {
    await next()
  }
}

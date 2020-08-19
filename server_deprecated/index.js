const ip = require('ip')
const Koa = require('koa')
const cors = require('@koa/cors')
const router = require('./router')
const { Nuxt, Builder } = require('nuxt')
const middleware = require('./middleware')
const chalk = require('chalk')

/**
 * Load process environments
 */
require('dotenv').config()

if (!process.env.API_URL) {
  console.log(chalk.bold.red('ERROR: Create .env file.'))
}

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const isDev = !(process.env.NODE_ENV === 'production');

(async () => {
  const app = new Koa()
  // Import and Set Nuxt.js options
  const config = require('../nuxt.config.js')
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (isDev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // inject middleware
  middleware(app)

  app
    .use(cors())
    .use(router.routes())
    .use(ctx => {
      ctx.status = 200
      ctx.respond = false // Mark request as handled for Koa
      nuxt.render(ctx.req, ctx.res)
    })
    .listen(port, host, () => {
      if (isDev) {
        console.log(chalk.bold.green(
          '\n' +
          'DEVELOPMENT server is ready on ' + 
          chalk.underline.cyan(`http://${ip.address()}:${port}`)
        ))
      }
    })
})()



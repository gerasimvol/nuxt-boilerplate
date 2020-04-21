/**
 * Load configuration parts
 * https://nuxtjs.org/guide/configuration
 */

const build = require('./nuxt-config/_build')
const css = require('./nuxt-config/_css')
const env = require('./nuxt-config/_env')
const generate = require('./nuxt-config/_generate')
const head = require('./nuxt-config/_head')
const modules = require('./nuxt-config/_modules')
const options = require('./nuxt-config/_options')
const plugins = require('./nuxt-config/_plugins')
const render = require('./nuxt-config/_render')
const router = require('./nuxt-config/_router')

module.exports = {
  mode: 'universal',
  build,
  css,
  env,
  generate,
  head,
  modules,
  ...options,
  plugins,
  render,
  router
}

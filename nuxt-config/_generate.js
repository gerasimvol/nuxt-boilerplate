/**
 * Generate configuration
 * due to dynamic routes every page require to be in routes array
 * https://nuxtjs.org/api/configuration-generate
 */

module.exports = {
  routes: [
    '/',
    '/ru',
    '/uk',
    '/en/catalogue/product-test-1',
    '/catalogue/product-test-1',
    '/ru/news/test-1'
  ]
}

/**
 * 'vue-meta' configuration
 * here only static data
 * dynamic data for every page is in ~/mixins/seo-mixin
 */

module.exports = {
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover'
    },
    { property: 'og:type', content: 'website' }
  ]
}

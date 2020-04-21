/**
 * vue-router configuration
 * https://nuxtjs.org/api/configuration-router
 */

const langRegExp = '([a-z]{2})' // just take two letters ('uk', 'en' etc.)

module.exports = {
  middleware: ['redirects'],

  extendRoutes (routes, resolve) {
    routes.push(
      // always homepage: "domain.com/en", "domain.com/"
      { 
        path: `/:lang${langRegExp}?`,
        name: 'home',
        component: resolve(__dirname, '../pages/-.vue')
      },

      // some named params: "domain.com/news", "domain.com/news/category", ""domain.com/news/category/article-id""
      {
        path: `/:lang${langRegExp}?/:level1?/:level2?/:level3?`,
        component: resolve(__dirname, '../pages/-.vue')
      },

      // any other route: "domain.com/en/news/category/article-id/level4/level5"
      {
        path: `/:lang${langRegExp}?/:level1?/:level2?/:level3?/*`,
        component: resolve(__dirname, '../pages/-.vue')
      }
    )
  }
}

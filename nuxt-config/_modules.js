/**
 * Additional modules configuration
 * https://github.com/nuxt-community/modules
 */

module.exports = [
  // Axios config
  [
    '@nuxtjs/axios', {
      credentials: false,
      proxyHeaders: false,
      debug: false
    }
  ],
  ['@nuxtjs/dotenv', { systemvars: true }],
  // Global imported style helpers
  '@nuxtjs/style-resources'
]

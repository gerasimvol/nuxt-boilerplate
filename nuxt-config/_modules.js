/**
 * Additional modules configuration
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

/**
 * Plugins configuration
 * https://nuxtjs.org/api/configuration-plugins
 */

module.exports = [
  // only on client
  {
    src: '~/plugins/client',
    mode: 'client'
  },
  {
    src: '~/plugins/with-context/router-transition',
    mode: 'client'
  },

  // both on server and client
  {
    src: '~/plugins/universal'
  },
  {
    src: '~/plugins/with-context/axios-interseptors'
  }
]

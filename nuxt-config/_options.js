/**
 * Other options in nuxt.config.js
 */

module.exports = {
  // Global style in every component (mixins, vars etc)
  // https://github.com/nuxt-community/style-resources-module
  styleResources: {
    scss: [
      '~/assets/styles/utils/mixins/*.scss',
      '~/assets/styles/utils/functions/*.scss'
    ]
  },

  // Customize the progress bar color
  loading: false
}

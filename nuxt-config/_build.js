/**
 * Additional build configurations & webpack config extension
 * https://nuxtjs.org/api/configuration-build
 */

const path = require('path')
const webpack = require('webpack')

module.exports = {

  analyze: false,

  // fix devtools styles break when onchange
  cssSourceMap: false,

  plugins: [

    // globals
    new webpack.ProvidePlugin({
      gsap: ['gsap', 'gsap'],
      _get: ['lodash/get'],
      $propTypes: [path.resolve(__dirname, '../assets/js/modules/PropTypes/index.js'), 'default']
    })
  ],

  extend (config, { isDev, isClient }) {
    // eslint
    if (isDev && isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }

    // stylelint
    if (isDev) {
      const StyleLintPlugin = require('stylelint-webpack-plugin')
      config.plugins.push(new StyleLintPlugin({
        files: '**/*.{scss,vue}',
        configFile: 'stylelint.config.js'
      }))
    }

    // SVG Loader
    config.module.rules
      .filter(rule => rule.test && /svg/.test(rule.test.toString()))
      .forEach(rule => {
        rule.test = /\.(png|jpe?g|gif)$/
      })
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'vue-svg-loader',
      options: {
        svgo: false // use https://jakearchibald.github.io/svgomg/
      }
    })

    // make '~/assets/variables' available in .scss files (rebuild after changes)
    config.module.rules.forEach(rule => {
      if (/scss/.test(rule.test.toString())) {
        rule.oneOf.forEach(key => {
          if (key.use) {
            key.use.push({
              loader: '@epegzz/sass-vars-loader',
              options: {
                syntax: 'sсss',
                files: [
                  path.resolve(__dirname, '../assets/variables/index.js')
                ]
              }
            })
          }
        })
      }
    })
  }
}

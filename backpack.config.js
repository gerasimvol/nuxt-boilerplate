const path = require('path')

module.exports = {
  webpack: (config) => {
    config.entry.main = path.resolve(__dirname, './server_deprecated/index.js')
    config.output.path = path.resolve(__dirname, './.nuxt/dist')
    return config
  }
}

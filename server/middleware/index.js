const fs = require('fs')
const folder = '/server/middleware/'

export default fs.readdirSync(`.${folder}`)
  .map(fileName => {
    return /^_.*\.js$/.test(fileName) ? `~${folder}${fileName}` : null
  })
  .filter(fileName => !!fileName)

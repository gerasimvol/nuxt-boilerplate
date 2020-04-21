/* eslint-disable */
const autocannon = require('/usr/local/lib/node_modules/autocannon')

autocannon({
  url: 'http://localhost:3030',
  connections: 200,
  pipelining: 1,
  duration: 10
})

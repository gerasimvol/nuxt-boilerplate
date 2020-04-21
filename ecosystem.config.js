module.exports = {
  apps: [{
    name: 'App name',
    exec_mode: 'fork',
    script: 'npm',
    args: 'start',
    port: 3039, // port from table with ports
    cwd: './',
    autorestart: true,
    watch: false,
    out_file: '/dev/null',
    error_file: '/dev/null'
  }]
}


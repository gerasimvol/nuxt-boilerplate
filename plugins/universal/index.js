// import all files from current directory with _example.js pattern
require('~/server_deprecated/utils/import-all').default(require.context('.', true, /_.+\.js$/))

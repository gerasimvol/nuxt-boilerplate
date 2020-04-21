import Vue from 'vue'

// Globally register the all directives

const requireDirective = require.context(
  '~/directives',
  false,
  /\w+\.js$/
)

requireDirective.keys().forEach(fileName => {
  const directiveConfig = requireDirective(fileName)
  const directiveName = fileName
    .replace(/\.\w+$/, '').substring(2)
  Vue.directive(directiveName, directiveConfig.default || directiveConfig[directiveName])
})

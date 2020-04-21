import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// Globally register the all 'Base' prefixed components

const requireComponent = require.context(
  '~/components/base',
  true,
  /Base[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.+\/)?(.+)\.(.+)/, '$2')
    )
  )

  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})

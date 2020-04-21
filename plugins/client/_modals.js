import Vue from 'vue'
import { EventBus } from '~/plugins/universal/_event-bus'

/**
 * componentName - {componentName}.vue in ~/components/modals
 */
Vue.prototype.$openModal = (componentName, data) => {
  EventBus.$emit('openModal', { componentName, data })
}

import Vue from 'vue'

/**
 * define event bus for global events
 * all name of events must contain name of component add name of event
 * Example: this.$bus.$emit('Accordion:change')
 */

export const EventBus = new Vue()

Vue.use({
  install (Vue) {
    if (Vue.prototype.hasOwnProperty('$bus')) return

    Object.defineProperty(Vue.prototype, '$bus', {
      get () {
        return EventBus
      }
    })
  }
})

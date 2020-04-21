/**
 * To prevent memory leaks:
 * 1. Don't save Observer instance to 'this' (Vue instance)
 * 2. Do observer.unobserve on beforeDestroy
 */

import isElement from 'lodash/isElement'
import createEvent from '~/assets/js/utils/create-event'

// Events that fire on observed element
const EVENTS = {
  INVIEW: 'inview',
  OUTVIEW: 'outview'
}

export default class Observer {
  constructor (settings = { root: null, rootMargin: '0px', threshold: 0.05 }) {
    if (!process.browser) return

    const observer = new IntersectionObserver(callback, settings)
    const events = {}

    this.observe = function (el) {
      if (isElement(el)) {
        if (_get(window, '$nuxt.$store')) {
          this.unwatch = window.$nuxt.$store.watch(
            (state) => state.ui.isOverlayVisible,
            (v) => !v && observer.observe(el),
            { immediate: true }
          )
        } else {
          observer.observe(el)
        }
      } else {
        console.error(`Intersection Observer: ${el} is not DOM element!`)
      }
    }

    this.unobserve = function (el) {
      if (isElement(el)) {
        observer.unobserve(el)
        this.unwatch()
      } else {
        console.error(`Intersection Observer: ${el} is not DOM element!`)
      }
    }

    initEvents()

    function callback (entries, observer) {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        const options = {
          repeat: false
        }

        Object.assign(options, getDataOptions(entry.target.dataset))

        if (entry.isIntersecting) {
          entry.target.dispatchEvent(events.INVIEW)
          if (!options.repeat) observer.unobserve(entry.target)
        } else {
          entry.target.dispatchEvent(events.OUTVIEW)
        }
      }
    }

    function getDataOptions (dataset) {
      return {
        // add data-observer-repeat='true' for prevent unobserve
        repeat: dataset.observerRepeat === 'true'
      }
    }

    function initEvents () {
      Object.keys(EVENTS).forEach(eventName => {
        events[eventName] = createEvent(EVENTS[eventName])
      })
    }
  }
}

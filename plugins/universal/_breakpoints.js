import Vue from 'vue'

const { breakpoints } = require('~/assets/variables/breakpoints')
const mqls = {}

const $resp = new Vue({
  data: () => {
    const points = {
      sm: true,
      md: false,
      lg: false,
      xl: false
    }

    if (process.browser) {
      Object.keys(breakpoints).forEach(point => {
        const nextPoint = getNextBreakpoint(point, breakpoints)

        if (nextPoint) {
          mqls[point] = window.matchMedia(`
            (min-width: ${breakpoints[point]}px) 
            and 
            (max-width: ${breakpoints[nextPoint] - 0.02}px)
          `)
          points[point] = mqls[point].matches
          mqls[point + 'Down'] = window.matchMedia(`(max-width: ${breakpoints[nextPoint] - 0.02}px)`)
          points[point + 'Down'] = mqls[point + 'Down'].matches
        } else {
          mqls[point] = window.matchMedia(`(min-width: ${breakpoints[point]}px)`)
          points[point] = mqls[point].matches
          mqls[point + 'Down'] = window.matchMedia(`(max-width: ${breakpoints[point] - 0.02}px)`)
          points[point + 'Down'] = mqls[point + 'Down'].matches
        }

        mqls[point + 'Up'] = window.matchMedia(`(min-width: ${breakpoints[point]}px)`)
        points[point + 'Up'] = mqls[point + 'Up'].matches
      })

      // landscape
      mqls.landscape = window.matchMedia('(orientation: landscape)')
      points.landscape = mqls.landscape.matches

      // portrait
      mqls.portrait = window.matchMedia('(orientation: portrait)')
      points.portrait = mqls.portrait.matches
    }

    return points
  },

  created () {
    this.subscribe()
  },

  methods: {
    subscribe () {
      Object.keys(mqls).forEach(point => {
        mqls[point].addListener((e) => {
          this[point] = e.matches
        })
      })
    }
  }
})

function getNextBreakpoint (point, breakpoints) {
  return Object.keys(breakpoints).find(p => breakpoints[p] > breakpoints[point])
}

Vue.use({
  install (Vue) {
    if (Vue.prototype.hasOwnProperty('$resp')) return

    Object.defineProperty(Vue.prototype, '$resp', {
      get () {
        return $resp
      }
    })
  }
})

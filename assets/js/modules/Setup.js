import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import { vh, vhStatic } from '~/assets/js/helpers/custom-vh'
import consoleEasterEgg from '~/assets/js/helpers/vintage-console'
import getScrollbarWidth from '~/assets/js/helpers/scrollbar-width'
import { EventBus } from '~/plugins/universal/_event-bus'

export default class Setup {
  static init (store) {
    // assign vuex/store instance to Setup
    Setup.$store = store

    // select HTML tag
    Setup.html = document.getElementsByTagName('html')[0]

    const { isIe } = Setup.$store.state.helpers.browsers
    Setup.isIe = isIe

    // first init
    Setup._onResize(null, { emit: false })

    // set resize listener
    window.addEventListener('resize', debounce(Setup._onResize, 300), false)

    // first init 
    Setup._onOrientationChange(null, { emit: false })

    // set orientation change listener
    window.addEventListener('orientationchange', Setup._onOrientationChange, false)

    // set scroll listener  
    window.addEventListener('scroll', throttle(Setup._onScroll, 50), false)

    // set inputType
    Setup._setInputType()

    // set device properties to html tag as classes
    Setup._setDeviceProperties()

    // console vintage label
    consoleEasterEgg()
  }

  static _onResize (e, { emit = true } = {}) {
    // init custom viewport height
    vh()

    if (emit) {
      // dispatch resize event
      EventBus.$emit('resize', e)
    }

    // set scrollBar width
    Setup.$store.commit('helpers/SET_SCROLLBAR_WIDTH', getScrollbarWidth())

    // set window sizes
    Setup.$store.commit('helpers/SET_WINDOW_DIMENSIONS', {
      width: Math.min(window.innerWidth, window.screen.width || 0),
      height: Math.min(window.innerHeight, window.screen.height || 0)
    })
  }

  static _onOrientationChange (e, { emit = true } = {}) {
    setTimeout(() => {
      const isMobileLandscape = window.matchMedia('(max-height: 414px) and (max-width: 896px) and (orientation: landscape)').matches
      Setup.$store.commit('helpers/SET_MOBILE_LANDSCAPE', isMobileLandscape)

      // init custom viewport height
      vhStatic()

      if (emit) {
        // dispatch orientationChange event
        EventBus.$emit('orientationchange', e)
      }
    }, 200)
  }

  static _onScroll (e) {
    EventBus.$emit('scroll', e)
  }

  static _setInputType () {
    // detect if device has mouse
    const hasMouse = window.matchMedia('(hover: hover)').matches

    // detect if device is touch
    const hasTouch = 'ontouchstart' in document.documentElement

    // commit to store & add class if device has mouse
    if (hasMouse || Setup.isIe) {
      Setup.$store.commit('helpers/HAS_MOUSE', true)
      Setup.html.classList.add('has-mouse')
    }

    // commit to store & add class if device is touch
    if (hasTouch) {
      Setup.$store.commit('helpers/HAS_TOUCH', true)
      Setup.html.classList.add('has-touch')
      Setup.hasTouch = true
    }
  }

  static _setDeviceProperties () {
    try {
      const { browsers, os } = Setup.$store.state.helpers

      // add browser classes to html tag
      Object.keys(browsers).forEach(browser => {
        if (browsers[browser]) Setup.html.classList.add(browser.replace(/^(is)/, '').toLowerCase())
      })

      // add operation system classes to html tag
      Object.keys(os).forEach(o => {
        if (os[o]) Setup.html.classList.add(o.replace(/^(is)/, '').toLowerCase())
      })
    } catch (e) {
      console.warn(e)
    }
  }
}

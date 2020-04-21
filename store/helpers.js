export const state = () => ({
  isMobileLandscape: false,
  windowWidth: 320,
  windowHeight: 480,
  hasMouse: false,
  hasTouch: false,
  scrollBarWidth: 0,
  browsers: {
    isSafari: false,
    isChrome: false,
    isIe: false,
    isEdge: false,
    isFirefox: false
  },
  os: {
    isAndroid: false,
    isIOS: false,
    isWindows: false,
    isUbuntu: false,
    isMacOs: false
  }
})

export const mutations = {
  SET_USER_AGENT (state, { browsers, os }) {
    state.browsers = { ...state.browsers, ...browsers }
    state.os = { ...state.os, ...os }
  },

  SET_SCROLLBAR_WIDTH (state, scrollBarWidth) {
    state.scrollBarWidth = scrollBarWidth
  },

  HAS_MOUSE (state, hasMouse) {
    state.hasMouse = hasMouse
  },

  HAS_TOUCH (state, hasTouch) {
    state.hasTouch = hasTouch
  },

  SET_WINDOW_DIMENSIONS (state, { width, height }) {
    state.windowWidth = width
    state.windowHeight = height
  },

  SET_MOBILE_LANDSCAPE (state, value) {
    state.isMobileLandscape = value
  }
}

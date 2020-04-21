import createEvent from '~/assets/js/utils/create-event'

// global event. trigger for APP fully ready
const appLoadedEvent = createEvent('app:loaded')

// main preloader before nuxt
let isPreloaderDone = false

export default {
  mounted () {
    // remove preloader while development
    if (process.env.NODE_ENV === 'development' && process.env.PRELOADER_ON_DEV === 'false') {
      this.$store.commit('ui/SET_OVERLAY_VISIBILITY', false)
      document.querySelector('.preloader').style.display = 'none'
      document.getElementById('__nuxt').style.overflow = ''
    }
  },

  methods: {
    hidePreloader () {
      isPreloaderDone = true
      this.$store.commit('ui/SET_OVERLAY_VISIBILITY', false)
      document.documentElement.removeEventListener('preloader:done', this.hidePreloader)
    },
    onAppLoaded () {
      if (!isPreloaderDone) {
        document.documentElement.addEventListener('preloader:done', this.hidePreloader)
      }

      const PRELOADER_MIN_VISIBILITY_MS = 200
      setTimeout(() => {
        document.documentElement.dispatchEvent(appLoadedEvent)
      }, PRELOADER_MIN_VISIBILITY_MS)
    }
  }
}

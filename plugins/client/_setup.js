import Setup from '~/assets/js/modules/Setup'

window.onNuxtReady(({ $store }) => {
  Setup.init($store)
})

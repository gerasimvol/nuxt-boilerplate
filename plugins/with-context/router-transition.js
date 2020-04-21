let firstLoad = true

export default async ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    store.commit('ui/SET_MENU_VISIBILITY', false)

    const noTransition = firstLoad ||
      (to.fullPath === from.fullPath) ||
      to.hash

    if (noTransition) {
      next()
      firstLoad = false
    } else {
      if (process.browser) {
        // call store.commit('ui/SET_OVERLAY_VISIBILITY', true)
        // and run animation (show overlay)
        // dont forget to call next() after animation
        next()
      } else {
        next()
      }
    }
  })

  app.router.afterEach((to, from) => {
    if (process.browser && !firstLoad && !to.hash) {
      // and run animation (hide overlay)
      // call store.commit('ui/SET_OVERLAY_VISIBILITY', false)
    }
  })
}

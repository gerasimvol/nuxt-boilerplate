import Vue from 'vue'
import Observer from '~/assets/js/modules/Observer'

// define typical animations 'from' (gsap.set, initial state) and 'to' (gsap.to, when in viewport)
const animations = {
  'fade-from-bottom': {
    from: {
      opacity: 0,
      y: 35
    },
    to: {
      opacity: 1,
      y: 0
    }
  }
}

/**
 * Usage:
 * 
 * pass value to v-animate with settings:
 * <div v-animate="{
 *    name: 'fade-from-bottom',
 *    duration: 1,
 *    delay: 0.5,
 *    ease: 'power1.in'
 * }" />
 * 
 * OR
 * 
 * even without to use default animation settings (most common inview animation):
 * <div v-animate />
 */

function getAnimationOptions (value = {}) {
  if (value.name && !animations[value.name]) {
    console.warn(`There is no name ${value.name} in v-animate`)
  }

  // possible v-animate settings and their fallbacks
  const options = {
    name: value.name || 'fade-from-bottom',
    ease: value.ease || 'power2.out',
    duration: value.duration || 0.8,
    delay: value.delay === undefined ? 0 : value.delay
  }

  return options
}

Vue.directive('animate', {
  bind: (el, { value = {} }, { context }) => {
    if (value.disabled) return

    const observer = new Observer()

    const { name, ...options } = getAnimationOptions(value)

    const tweenOptions = {
      ...animations[name].to, // styles
      ...options // settings
    }

    // set initial animation styles
    gsap.set(el, animations[name].from)

    // observe when preloader or router-transition is gone
    context.$store.watch(state => state.ui.isOverlayVisible, (newValue, oldValue) => {
      if (!newValue && newValue !== oldValue) {
        observer.observe(el)
      }
    }, { immediate: true })
    el.observer = observer

    // animate when in viewport (event from observer)
    const onInview = () => { gsap.to(el, tweenOptions) }
    el.onInview = onInview
    el.addEventListener('inview', onInview)
  },


  unbind (el, { value = {} }, { context }) {
    el.observer.unobserve(el)
    el.removeEventListener('inview', el.onInview)
    delete el.onInview
    delete el.observer
  }
})

/**
 * SSR directives (only for html el, with components don't works)
 *
 */

module.exports = {
  bundleRenderer: {
    shouldPreload (file, type) {
      return ['script', 'style', 'font'].includes(type)
    }
  }
}

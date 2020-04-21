/**
 *  Use ES5 and vanila css for IE, because preloader files are not processed with webpack(babel)
 * 
 *  1. Preloader is connected in app.html for loading first and covering app while it is loading.
 *  2. When 'app:loaded' event is triggered from app-loaded-mixin loader will start hide animation.
 *  3. When hide animation is done (or almost done) - 'preloader:done' event is triggered
 */

(function () {
  window.document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  document.getElementById('__nuxt').style.overflow = 'hidden'
  
  var preloaderEl = document.querySelector('.preloader')
  if (!preloaderEl) {
    console.error('No preloader HTML element. Add it in app.html')
    return
  }

  var preloaderDone = createEvent('preloader:done')

  // subscribe to global event app:loaded
  document.documentElement.addEventListener('app:loaded', hide, false)

  function hide () {
    document.documentElement.removeEventListener('app:loaded', hide)

    var PRELOADER_HIDE_DURATION_MS = 1700 // full hide duration
    var PRELOADER_HIDE_DELTA = 300 // control this value for observer animations

    // start hide animation
    preloaderEl.classList.add('preloader_hidden')

    // remove preloader (page is scrollable, animations begin)
    setTimeout(function () {
      // for app-loaded-mixin
      document.documentElement.dispatchEvent(preloaderDone)

      // enable scroll
      document.getElementById('__nuxt').style.overflow = ''

      // scroll to #anchor
      if (window.location.hash) {
        document.getElementById(window.location.hash.substr(1)).scrollIntoView({ behavior: 'smooth' })
      }
    }, PRELOADER_HIDE_DURATION_MS - PRELOADER_HIDE_DELTA)

    // remove preloader (page is clickable)
    setTimeout(function () {
      preloaderEl.style.display = 'none'
    }, PRELOADER_HIDE_DURATION_MS)
  }
})()

function createEvent (name) {
  var event = document.createEvent('Event')
  event.initEvent(name, false, false)
  return event
}

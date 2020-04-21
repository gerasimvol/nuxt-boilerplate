module.exports = function ({
  to = 0, // can be element
  container = window, // scroll owner
  duration = 0.8,
  offset = 0 // (window.innerHeight / 2) - to middle of the screen
}) {
  gsap.to(container, {
    duration,
    scrollTo: {
      y: to,
      autoKill: false, // fix iOS
      offsetY: offset
    },
    ease: 'power2.inOut'
  })
}

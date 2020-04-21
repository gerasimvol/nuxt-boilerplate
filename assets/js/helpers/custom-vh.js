/*
  https://css-tricks.com/the-trick-to-viewport-units-on-mobile

  Usage:
  1. Import and include mixin to component
  2. Add styles to element:

  // Recalculate on any resize
  @include vh()

  OR

  // Recalculate on page load and orientation change
  @include vhStatic()
*/

export function vh () {
  if (!process.browser) return

  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

export function vhStatic () {
  if (!process.browser) return

  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh-static', `${vh}px`)
}

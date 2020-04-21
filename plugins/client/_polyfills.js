document.addEventListener('DOMContentLoaded', (event) => {
  if (!('CSS' in window && CSS.supports('object-fit', 'cover'))) {
    require('object-fit-images')()
  
    // TODO: timeout for now, if doesnt work well - call polyfill in BaseLazyVideo
    setTimeout(() => {
      require('object-fit-videos')()
    }, 1500)
  }
})

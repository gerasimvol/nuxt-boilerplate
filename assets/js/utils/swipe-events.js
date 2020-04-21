export default class SwipeEvents {
  constructor (el) {
    this.startX = 0
    this.startY = 0

    this.el = el

    this.listeners = {
      up: [],
      right: [],
      down: [],
      left: []
    }

    this.el.addEventListener('touchstart', this._touchstart.bind(this), { passive: true })
  }

  onSwipe (direction, callback) {
    this.listeners[direction].push(callback)
  }

  unobserve () {
    this.el.removeEventListener('touchstart', this._touchstart.bind(this), { passive: true })
    this.el.removeEventListener('touchmove', this._touchmove.bind(this), { passive: true })
  }

  _touchstart (event) {
    const touches = event.touches
    if (touches && touches.length) {
      this.startX = touches[0].pageX
      this.startY = touches[0].pageY
      this.el.addEventListener('touchmove', this._touchmove.bind(this), { passive: true })
    }
  }

  _touchmove (event) {
    const touches = event.touches
    if (touches && touches.length) {
      const deltaX = this.startX - touches[0].pageX
      const deltaY = this.startY - touches[0].pageY
      
      if (deltaY >= 50) {
        this.listeners.up.forEach(callback => callback())
      }
      if (deltaX <= -50) {
        this.listeners.right.forEach(callback => callback())
      }
      if (deltaY <= -50) {
        this.listeners.down.forEach(callback => callback())
      }
      if (deltaX >= 50) {
        this.listeners.left.forEach(callback => callback())
      }
      
      if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
        this.el.removeEventListener('touchmove', () => { this._touchmove }, { passive: true })
      }
    }
  }
}

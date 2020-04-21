/**
 * Check for available scrolling in all directions
 * 
 * Usage:
 * 1. Call initOverflowGradientMixin(scrollableEl, elToAddClasses) method
 *    when scrollable element appear in DOM  (mounted etc.)
 *
 * 2. Mixin will add 'has-scroll-top', 'has-scroll-right',
 *    'has-scroll-bottom', 'has-scroll-left' classes
 *    to elToAddClasses
 */

export default {
  data () {
    return {
      maxScrollY: null,
      maxScrollX: null,
      hasScroll: {
        top: false,
        right: false,
        bottom: false,
        left: false
      }
    }
  },

  watch: {
    hasScroll: {
      handler (hasScroll) {
        Object.keys(hasScroll).forEach(direction => {
          const cssClass = `has-scroll-${direction}`
          const func = hasScroll[direction] ? 'add' : 'remove'

          this.elToAddClasses.classList[func](cssClass)
        })
      },
      deep: true
    }
  },

  beforeDestroy () {
    this.$bus.$off('resize', this.onWindowResize)
    this.scrollableEl.removeEventListener('scroll', this.onElementScroll)
  },

  methods: {
    initOverflowGradientMixin (scrollableEl, elToAddClasses) {
      try {
        this.elToAddClasses = elToAddClasses
        this.scrollableEl = scrollableEl
  
        this.onWindowResize()

        this.$bus.$on('resize', this.onWindowResize)
        this.scrollableEl.addEventListener('scroll', this.onElementScroll)
      } catch (err) {
        console.error('Pass scrollableEl and elToAddClasses to initOverflowGradientMixin')
      }
    },
    onWindowResize () {
      if (this.scrollableEl) {
        this.maxScrollX = Math.max(this.scrollableEl.scrollWidth - this.scrollableEl.offsetWidth, 0)
        this.maxScrollY = Math.max(this.scrollableEl.scrollHeight - this.scrollableEl.offsetHeight, 0)

        this.onElementScroll()
      }
    },
    onElementScroll () {
      if (this.maxScrollX !== null) {
        this.hasScroll.left = this.scrollableEl.scrollLeft > 0
        this.hasScroll.right = this.scrollableEl.scrollLeft < this.maxScrollX
      }

      if (this.maxScrollY !== null) {
        this.hasScroll.top = this.scrollableEl.scrollTop > 0
        this.hasScroll.bottom = this.scrollableEl.scrollTop < this.maxScrollY
      }
    }
  }
}

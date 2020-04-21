export default {
  data () {
    return {
      isHidden: false,
      prevScrollPosition: 0,
      minScrollToHide: 15
    }
  },

  mounted () {
    this.onScroll({ firstCheck: true })
    this.$bus.$on('scroll', this.onScroll)
  },

  beforeDestroy () {
    this.$bus.$off('scroll', this.onScroll)
  },
  
  methods: {
    onScroll ({ firstCheck } = {}) {
      const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
      let scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
      
      if (scrollTop < 0) {
        scrollTop = 0
      } else if (scrollTop > maxScroll) {
        scrollTop = maxScroll
      }

      const isOnTop = scrollTop <= 0
      if (isOnTop) {
        this.$el.classList.add('header_on-top')
      } else {
        this.$el.classList.remove('header_on-top')
      }

      if (firstCheck) {
        this.prevScrollPosition = scrollTop
        return
      }

      const isScrollingDown = this.prevScrollPosition < scrollTop
      const isHidden = isScrollingDown && (scrollTop > this.minScrollToHide)
      if (isHidden) {
        this.$el.classList.add('header_hidden')
      } else {
        this.$el.classList.remove('header_hidden')
      }

      this.prevScrollPosition = scrollTop
    }
  }
}

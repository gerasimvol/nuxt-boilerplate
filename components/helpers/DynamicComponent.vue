<script>
  export default {
    name: 'DynamicComponent',

    props: {
      componentName: {
        type: String,
        required: true
      },
      componentProps: {
        type: Object,
        default: () => ({})
      }
    },

    created () {
      if (!this.componentName) return null
      this.loadComponent()
    },

    methods: {
      loadComponent () {
        const componentName = this.componentName

        this.component = () => import(/* webpackChunkName: "[request]" */ '~/components/blocks/' + componentName)
          .then(component => {
            // trigger component is loaded
            return component.default || component
          })
          .catch((err) => {
            // trigger component is on error
            this.$emit('error')

            // return error component
            return {
              render (h) {
                return h(
                  'div',
                  { style: 'color: red; padding: 20px; text-align: left' },
                  `Component (${componentName}) that you are trying to load does not exist.`
                )
              }
            }
          })
      }
    },

    render (h) {
      return h(this.component, {
        props: this.componentProps,
        attrs: this.$attrs
      })
    }
  }
</script>

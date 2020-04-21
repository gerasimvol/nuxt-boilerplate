<script>
  import DynamicComponent from '~/components/helpers/DynamicComponent'
  import seoMixin from '~/mixins/logic/seo-mixin'
  import appLoadedMixin from '~/mixins/logic/app-loaded-mixin'

  export default {
    name: 'DynamicPage',

    components: { DynamicComponent },

    mixins: [seoMixin, appLoadedMixin],

    layout ({ route }) {
      // use route to choose layout, then fetch special data for layout before fetchPageData
      return 'default'
    },

    // get data for page
    async asyncData ({ store, params, query, redirect, route }) {
      const _params = { ...params }
      _params.level1 = params.level1 || params.pathMatch || 'home'

      return await store.dispatch('fetchPageData', { params: _params, query, redirect, route })
    },

    data: () => ({
      loadedBlockComponentsAmount: 0,
      blockComponents: []
    }),

    watch: {
      // wait till all blocks will load - then hide preloader
      loadedBlockComponentsAmount: {
        handler (v) {
          if (this.blockComponents.length === v && process.browser) {
            this.onAppLoaded()
          }
        },
        immediate: true
      }
    },

    render (h) {
      const vm = this
      this.blockComponents = this.blocks || []

      // load blocks
      const childs = this.blockComponents.map((item, i) => {
        return h('DynamicComponent', {
          props: {
            componentProps: item.attributes,
            componentName: item.id
          },

          attrs: {
            'data-is-first-block': i === 0,
            'data-is-last-block': i === this.blockComponents.length - 1
          },

          on: {
            'hook:mounted' () {
              vm.loadedBlockComponentsAmount = vm.loadedBlockComponentsAmount + 1
            },
            'error' () {
              vm.loadedBlockComponentsAmount = vm.loadedBlockComponentsAmount + 1
            }
          }
        })
      })

      return h('main', {
        staticClass: 'page-content'
      }, childs)
    }
  }
</script>

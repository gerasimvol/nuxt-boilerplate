<template>
  <main class="error-page">
    <div class="container">
      <h1>
        {{ error }}
      </h1>
    </div>
  </main>
</template>

<script>
  import appLoadedMixin from '~/mixins/logic/app-loaded-mixin'
  import seoMixin from '~/mixins/logic/seo-mixin'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'ErrorPage',

    mixins: [appLoadedMixin, seoMixin],

    props: {
      error: {
        type: Object,
        validator (error) {
          return 'statusCode' in error &&
            'message' in error
        },
        default: () => ({
          statusCode: 500,
          message: 'Undefined error'
        })
      }
    },

    computed: {
      ...mapState({
        errorPageData: function (state) {
          return _get(state, ['globalData', 'errors', this.error.statusCode]) ||
            _get(state, ['globalData', 'errors', 404]) || {}
        },
        meta: function () {
          return {
            seo: this.errorPageData.seo || {}
          }
        }
      })
    },

    created () {
      this.SET_IS_ERROR_PAGE(true)
    },

    mounted () {
      this.onAppLoaded()
    },

    beforeDestroy () {
      this.SET_IS_ERROR_PAGE(false)
    },

    methods: {
      ...mapMutations(['SET_IS_ERROR_PAGE'])
    }
  }
</script>

<style lang="scss">
</style>

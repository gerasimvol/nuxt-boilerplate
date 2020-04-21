import { mapState, mapGetters } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import appendScripts from '~/assets/js/helpers/append-scripts'

let scriptsAppened = false

export default {
  computed: {
    ...mapState(['origin']),
    ...mapGetters(['getCurrentLocale', 'getScripts'])
  },

  head () {
    const seo = _get(this, ['meta', 'seo'], {})
    const og = _get(seo, 'og', {}) 

    return {
      htmlAttrs: {
        lang: this.getCurrentLocale.code
      },
      title: seo.title,
      meta: [
        { name: 'robots', content: seo.robots },
        { name: 'description', content: seo.description },
        { name: 'og:title', content: og.title },
        { name: 'og:description', content: og.description },
        { property: 'og:image', content: og.image },
        { property: 'theme-color', name: 'theme-color', content: '#fe4100' }
      ],
      link: [...this.generateLinks()],
      script: [
        {
          json: this.generateBreadcrumbsMicromark(seo.breadcrumbs),
          type: 'application/ld+json'
        }
      ]
    }
  },

  mounted () {
    if (!scriptsAppened) {
      appendScripts(this.getScripts)
      scriptsAppened = true
    }
  },

  methods: {
    generateLinks () {
      const result = []

      // canonical
      if (!isEmpty(this.$route.query) && !this.$route.query.page) {
        result.push({ rel: 'canonical', href: `${this.origin}${this.$route.path}` })
      }

      return result
    },

    generateBreadcrumbsMicromark (breadcrumbs) {
      if (!breadcrumbs) return {}

      return {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((breadcrumb, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': {
            '@id': `${this.origin}${breadcrumb.url || ''}`,
            'name': breadcrumb.label
          }
        }))
      }
    }
  }
}

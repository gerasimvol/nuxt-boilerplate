import { logRamUsage } from '~/assets/js/helpers/log-ram-usage'

export const state = () => ({
  // basic site data includes header, footer, locales etc.
  globalData: {},

  // data for page. Includes blocks, meta, seo etc.
  pageData: {},

  origin: '',

  isErrorPage: false
})

export const getters = {
  getLocales: state => _get(state, 'globalData.locales', []),
  getPageLocales: state => _get(state, 'pageData.meta.locales', []),
  getDefaultLocale: (state, getters) => getters.getLocales.find(locale => locale.default) || {},
  getCurrentLocale: (state, getters) => getters.getLocales.find(locale => locale.current) || {},
  getScripts: state => _get(state, 'globalData.scripts', {})
}

export const actions = {
  async nuxtServerInit ({ dispatch, commit }, { req, res }) {
    logRamUsage()

    commit('helpers/SET_USER_AGENT', JSON.parse(res.getHeaders()['parsed-user-agent']))
    commit('SET_ORIGIN', res.getHeaders()['origin'])
    await dispatch('fetchGlobalData')
  },


  async fetchGlobalData ({ commit, dispatch, state }) {
    try {
      // load real API globalData
      const { data } = await this.$axios.get('/global-data')
      commit('SET_GLOBAL_DATA', _get(data, ['attributes'], {}))
    } catch (realApiError) {
      if (process.env.FAKE_API_ENABLED === 'true') {
        try {
          // load fake API globalData
          const { data } = await this.$axios.get(`${state.origin}/fake-api/global-data`)
          commit('SET_GLOBAL_DATA', data)
        } catch (fakeApiError) {
          console.dir(fakeApiError)
        }
      } else {
        console.dir(realApiError)
      }
    }
  },


  async fetchPageData ({ commit, getters, state }, { params: { lang, level1, level2, level3 }, query }) {
    if (lang && !getters.getLocales.some(locale => locale.code === lang)) {
      throw new Error('No such language')
    }

    const urlParts = ['pages', level1, level2, level3]
    const page = encodeURI('/' + urlParts.filter(part => part).join('/'))

    try {
      // load real API pageData
      const { data } = await this.$axios.get(page, { params: query })

      // TODO: add multiple blocks (now only first)
      // fetch first items from dynamicDataUrl and merge with attributes
      for (const block of data.blocks) {
        if (block.attributes.dynamicDataUrl) {
          const { data } = await this.$axios.get(
            block.attributes.dynamicDataUrl,
            { params: { 'page': 1, 'per-page': 6 } }
          )
          block.attributes.initialDynamicItemsData = data
        }
      }

      commit('SET_PAGE_DATA', data)
      return data
    } catch (realApiError) {
      if (process.env.FAKE_API_ENABLED === 'true') {
        try {
          // load fake API pageData
          const { data } = await this.$axios.get(`${state.origin}/fake-api` + page, { params: query })
          commit('SET_PAGE_DATA', data)
          return data
        } catch (fakeApiError) {
          console.dir(fakeApiError)
        }
      } else {
        console.dir(realApiError)
      }
    }
  }
}

export const mutations = {
  SET_GLOBAL_DATA (state, data) {
    console.log('data', data)
    state.globalData = data
  },

  SET_PAGE_DATA (state, data) {
    state.pageData = {}
    state.pageData = data
  },

  SET_ORIGIN (state, origin) {
    state.origin = origin
  },

  SET_IS_ERROR_PAGE (state, value) {
    state.isErrorPage = value
  },

  SET_PREV_ROUTE (state, value) {
    state.prevRoute = value
  }
}


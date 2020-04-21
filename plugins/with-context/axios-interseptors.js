/**
 * Plugin for extending axios: add headers on request. catch errors
 *
 */

/**
 * Codes that using for redirect to error page
 * @type {number[]}
 */
const STATUS_CODES_ERROR = [404, 500]

export default function ({ $axios, params: { lang }, store, app }) {
  /**
   * Add language param to request
   */
  $axios.onRequest(async (config) => {
    const langCode = lang || store.getters.getDefaultLocale.code
    
    if (langCode) {
      config.headers.common['Accept-Language'] = langCode
    }

    return config
  })

  /**
   * Handle all errors
   */
  $axios.onError(({ response }) => {
    console.error('Error caught in axios-interseptors.')

    // if (!response) {
    //   showErrorPage(500, 'No response')
    //   return response
    // }

    if (process.env.FAKE_API_ENABLED !== 'true') {
      showErrorPage(response.status, 'real API error')
      return response
    }

    if (process.env.FAKE_API_ENABLED === 'true' && response.headers['fake-api'] === 'true') {
      showErrorPage(response.status, 'fake API error')
    }

    function showErrorPage (statusCode, message) {
      if (STATUS_CODES_ERROR.includes(statusCode)) {
        app.context.error({
          statusCode,
          message: `(${statusCode}) ${message}`
        })
      }
    }
  })
}

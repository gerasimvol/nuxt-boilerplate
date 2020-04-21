import redirectToPath from '~/server/utils/path-for-redirect'

export default function ({ store: { getters }, route, params: { lang }, redirect }) {
  const defaultLocaleCode = _get(getters, 'getDefaultLocale.code', '')

  // redirect from default lang to no-default
  if (lang === defaultLocaleCode) {
    redirect(301, route.fullPath.replace(new RegExp(`^/(${lang})/?`), '/'))
    return true
  }

  const path = redirectToPath(route.fullPath)
  if (path) {
    redirect(301, path)
    return true
  }
}


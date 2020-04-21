const langRegExp = '([a-z]{2})' // just take two letters ('uk', 'en' etc.)

export default function (path) {
  let pathWithoutQueryStringPart = path
  let pathWithQueryStringPart = ''
  if (path.split('?')) {
    pathWithoutQueryStringPart = path.split('?')[0]
    pathWithQueryStringPart = path.split('?')[1]
      ? '?' + path.split('?')[1]
      : ''
  }

  switch (true) {
  // prevent normalize for nuxt paths
  case /_nuxt/.test(path):
    return false

  // remove multiple slash /good/////test => /good/test
  case /\/\//.test(path):
    return path.replace(/\/+/g, '/')

  // redirect from UPPERCASE to lowercase (without querystring)
  case /[A-ZА-Я]/.test(pathWithoutQueryStringPart) && !/\.\w+$/.test(pathWithoutQueryStringPart):
    return (pathWithoutQueryStringPart.toLocaleLowerCase() + pathWithQueryStringPart)

  // remove slash on the end
  case /.+\/$/g.test(path):
    return path.replace(/\/$/g, '')

  // remove page=1 param
  case /\?(.+)?page=1($|&)/g.test(path):
    return path.replace(/&?page=1/g, '').replace(/\?$/, '')

  // redirect from /home , /ru/home => /
  case new RegExp('^/' + langRegExp + '?\\/?home(((\\?|\\/|#).+)|$|\\/)').test(path):
    if (new RegExp('^/' + langRegExp + '\\/').test(path)) {
      return path.replace(/\/home\/?/, '')
    } else {
      return path.replace(/\/home\/?/, '/')
    }

  default:
    return false
  }
}

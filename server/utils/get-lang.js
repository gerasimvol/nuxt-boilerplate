module.exports = function (ctx) {
  const languages = ctx.acceptsLanguages()
  const lang = languages[0]

  return lang !== '*' ? lang : 'uk'
}

